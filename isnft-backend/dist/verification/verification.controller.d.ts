/// <reference types="multer" />
import { VerificationService } from './verification.service';
import { VerifyDto } from './dto/verify.dto';
import { Response } from 'express';
export declare class VerificationController {
    private verificationService;
    constructor(verificationService: VerificationService);
    verify(res: Response, file: Express.Multer.File, verify: VerifyDto): Promise<Response<any, Record<string, any>>>;
}
