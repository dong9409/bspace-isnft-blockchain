/// <reference types="multer" />
import { VerifyDto } from './dto/verify.dto';
export declare class VerificationService {
    constructor();
    verify(f: {
        file: Express.Multer.File;
        verify: VerifyDto;
    }): Promise<{
        verify: boolean;
        distance: number;
        diff: number;
    }>;
}
