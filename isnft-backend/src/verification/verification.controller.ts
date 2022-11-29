import { VerificationService } from './verification.service';
import { VerifyDto } from './dto/verify.dto';
import {
  Controller,
  Post,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('verification')
export class VerificationController {
  constructor(private verificationService: VerificationService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async verify(
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
    @Body() verify: VerifyDto,
  ) {
    try {
      const result = await this.verificationService.verify({
        file,
        verify,
      });
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
