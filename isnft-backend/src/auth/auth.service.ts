import { ConfigService } from '@nestjs/config';
import { SignInUserDTO } from './dto/signin-user.dto';
import { SignUpUserDTO } from './dto/signup-user.dto';
import { User, USER_TPYE } from './../entity/user.entity';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * 회원 가입
   * --
   * @param userInfo
   * @returns
   */
  async signUpUser(userInfo: SignUpUserDTO) {
    try {
      const { user_id, user_pw, user_type } = userInfo;
      const check = await this.userRepository.findOne({ where: { user_id } });

      if (check) {
        throw new Error('이미 가입된 회원입니다.');
      }

      let _result;

      if (user_type === USER_TPYE.EMAIL) {
        const hash = await argon.hash(user_pw);
        _result = this.userRepository.create({
          ...userInfo,
          user_pw: hash,
        });
      } else {
        _result = this.userRepository.create({
          user_id: user_id,
          user_type: user_type,
          user_nm: user_id,
        });
      }
      const result = await this.userRepository.save(_result);

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 로그인
   * --
   * @param userInfo
   * @returns
   */
  async signInUser(userInfo: SignInUserDTO) {
    try {
      const { user_id, user_pw, user_type } = userInfo;
      const user = await this.userRepository.findOneOrFail({
        where: { user_id },
      });
      if (user_type === USER_TPYE.EMAIL) {
        const pwMatches = await argon.verify(user.user_pw, user_pw);
        if (!pwMatches) {
          throw new ForbiddenException('회원정보가 일치하지 않습니다.');
        }
      }
      delete user.user_pw;

      const access_token = await this.generateToken(user.user_id, 'ADMIN');
      const login_data = {
        ...user,
        ...access_token,
      };
      return login_data;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 토큰 생성
   * --
   * @param id
   * @param type
   * @returns
   */
  async generateToken(
    id: string,
    type = 'ADMIN',
  ): Promise<{ access_token: string }> {
    const payload = {
      id: id,
      type: type,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }

  /**
   * 토큰 인증
   * --
   * @param authorization
   * @returns
   */
  async verify(authorization: string) {
    try {
      const token = authorization.replace('Bearer ', '');
      const result = this.jwt.decode(token);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
