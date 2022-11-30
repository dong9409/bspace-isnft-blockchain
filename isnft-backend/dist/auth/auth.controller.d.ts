import { SignInUserDTO } from './dto/signin-user.dto';
import { SignUpUserDTO } from './dto/signup-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUpUser(res: Response, userInfo: SignUpUserDTO): Promise<Response<any, Record<string, any>>>;
    signInUser(res: Response, userInfo: SignInUserDTO): Promise<Response<any, Record<string, any>>>;
}
