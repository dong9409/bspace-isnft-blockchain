import { JwtGaurd } from './../auth/guard/jwt.gaurd';
import { UpdateContentDto } from './dto/update-content.dto';
import { CreateContentDto } from './dto/create-content.dto';
import { ContentService } from './content.service';
import {
  Controller,
  Post,
  Res,
  HttpStatus,
  Get,
  Param,
  Put,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

@UseGuards(JwtGaurd)
@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Post()
  async createContent(
    @Res() res: Response,
    @Body() contentInfo: CreateContentDto,
  ) {
    try {
      const result = await this.contentService.createContent(contentInfo);
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

  @Get('')
  async getContentList(@Res() res: Response) {
    try {
      const result = await this.contentService.getContentList();
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

  @Get('/user/:user_id')
  async getContentByUser(
    @Res() res: Response,
    @Param('user_id') user_id: string,
  ) {
    try {
      const result = await this.contentService.getContentByUser(user_id);
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

  @Get(':content_id')
  async getContentById(
    @Res() res: Response,
    @Param('content_id') content_id: string,
  ) {
    try {
      const result = await this.contentService.getContentById(content_id);
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

  @Put()
  async updateContent(
    @Res() res: Response,
    @Body() contentInfo: UpdateContentDto,
  ) {
    try {
      const result = await this.contentService.updateContent(contentInfo);
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

  @Put(':content_id')
  async mintContent(
    @Res() res: Response,
    @Param('content_id') content_id: string,
  ) {
    try {
      const result = await this.contentService.mintContent(content_id);
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

  @Delete(':content_id')
  async deleteContent(
    @Res() res: Response,
    @Param('content_id') content_id: string,
  ) {
    try {
      const result = await this.contentService.deleteContent(content_id);
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
