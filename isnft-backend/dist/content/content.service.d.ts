import { UpdateContentDto } from './dto/update-content.dto';
import { CreateContentDto } from './dto/create-content.dto';
import { Content } from './../entity/content.entity';
import { Repository } from 'typeorm';
export declare class ContentService {
    private contentRepository;
    constructor(contentRepository: Repository<Content>);
    createContent(contentInfo: CreateContentDto): Promise<CreateContentDto & Content>;
    getContentList(): Promise<Content[]>;
    getContentByUser(user_id: string): Promise<Content[]>;
    getContentById(content_id: string): Promise<Content>;
    updateContent(contentInfo: UpdateContentDto): Promise<import("typeorm").UpdateResult>;
    mintContent(content_id: string): Promise<import("typeorm").UpdateResult>;
    deleteContent(content_id: string): Promise<import("typeorm").DeleteResult>;
}
