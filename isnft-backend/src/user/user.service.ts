import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, USER_TPYE } from 'src/entity';
import { Repository } from 'typeorm';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * 회원 정보 등록
   * --
   * @param userInfo
   * @returns
   */
  async createUser(userInfo: CreateUserDTO) {
    try {
      const { user_id, user_pw } = userInfo;
      const check = await this.userRepository.findOne({ where: { user_id } });

      if (check) {
        throw new Error('이미 가입된 회원입니다.');
      }

      const hash = await argon.hash(user_pw);
      const result = await this.userRepository.save({
        ...userInfo,
        user_pw: hash,
      });

      delete result.user_pw;

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 회원 정보 조회
   * --
   */
  async getUserList() {
    try {
      const result = await this.userRepository.find();
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 회원정보 단일 조회
   * --
   * @param user_id
   * @returns
   */
  async getUserDetail(user_id: string) {
    try {
      const result = await this.userRepository.findOneOrFail({
        where: { user_id },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 회원 정보 수정
   * --
   * @param userInfo
   * @returns
   */
  async updateUser(userInfo: UpdateUserDTO) {
    try {
      const { user_id, ...updateInfo } = userInfo;
      await this.userRepository.findOneOrFail({ where: { user_id } });
      if (updateInfo.user_pw) {
        updateInfo.user_pw = await argon.hash(updateInfo.user_pw);
      }
      const result = await this.userRepository.update({ user_id }, updateInfo);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 회원 정보 삭제
   * --
   * @param user_id
   * @returns
   */
  async deleteUser(user_id: string) {
    try {
      await this.userRepository.findOneOrFail({ where: { user_id } });
      const result = await this.userRepository.delete(user_id);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
