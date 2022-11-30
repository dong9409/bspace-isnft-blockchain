import { ConfigService } from '@nestjs/config';
import { SignInUserDTO } from './dto/signin-user.dto';
import { SignUpUserDTO } from './dto/signup-user.dto';
import { User, USER_TPYE } from './../entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwt;
    private config;
    private userRepository;
    constructor(jwt: JwtService, config: ConfigService, userRepository: Repository<User>);
    signUpUser(userInfo: SignUpUserDTO): Promise<any>;
    signInUser(userInfo: SignInUserDTO): Promise<{
        access_token: string;
        user_id: string;
        user_nm: string;
        user_pw?: string;
        user_type: USER_TPYE;
        created_at: Date;
        modified_at: Date;
    }>;
    generateToken(id: string, type?: string): Promise<{
        access_token: string;
    }>;
    verify(authorization: string): Promise<string | {
        [key: string]: any;
    }>;
}
