import { SignInUserDTO } from './dto/signin-user.dto';
import { SignUpUserDTO } from './dto/signup-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUpUser(@Res() res: Response, @Body() userInfo: SignUpUserDTO) {
    try {
      const result = await this.authService.signUpUser(userInfo);
      console.log(`'result=========='`, result);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }

  @Post('/signin')
  async signInUser(@Res() res: Response, @Body() userInfo: SignInUserDTO) {
    try {
      const result = await this.authService.signInUser(userInfo);
      console.log(`'result=========='`, result);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }
}
