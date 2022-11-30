import { UpdateContentDto } from './dto/update-content.dto';
import { CreateContentDto } from './dto/create-content.dto';
import { ContentService } from './content.service';
import { Response } from 'express';
export declare class ContentController {
    private contentService;
    constructor(contentService: ContentService);
    createContent(res: Response, contentInfo: CreateContentDto): Promise<Response<any, Record<string, any>>>;
    getContentList(res: Response): Promise<Response<any, Record<string, any>>>;
    getContentByUser(res: Response, user_id: string): Promise<Response<any, Record<string, any>>>;
    getContentById(res: Response, content_id: string): Promise<Response<any, Record<string, any>>>;
    updateContent(res: Response, contentInfo: UpdateContentDto): Promise<Response<any, Record<string, any>>>;
    mintContent(res: Response, content_id: string): Promise<Response<any, Record<string, any>>>;
    deleteContent(res: Response, content_id: string): Promise<Response<any, Record<string, any>>>;
}
