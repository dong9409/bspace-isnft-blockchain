import { VerifyDto } from './dto/verify.dto';
import { Injectable } from '@nestjs/common';
import * as jimp from 'jimp';
import * as fs from 'fs';
import axios from 'axios';

@Injectable()
export class VerificationService {
  constructor() {}

  async verify(f: { file: Express.Multer.File; verify: VerifyDto }) {
    try {
      const { file, verify } = f;
      const { content_url } = verify;
      const img1 = file.buffer;

      const bufferFromUrl = await axios.get(content_url, {
        responseType: 'arraybuffer',
      });
      const img2 = Buffer.from(bufferFromUrl.data, 'utf-8');

      const vImg1 = await jimp.read(img1);
      const vImg2 = await jimp.read(img2);

      const distance = jimp.distance(vImg1, vImg2);
      const diff = jimp.diff(vImg1, vImg2).percent;
      console.log(distance);
      console.log(diff);

      return {
        verify: distance === 0 || diff < 0.2 ? true : false,
        distance: distance,
        diff: diff,
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
