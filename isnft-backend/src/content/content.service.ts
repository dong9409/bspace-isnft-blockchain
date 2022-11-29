import { UpdateContentDto } from './dto/update-content.dto';
import { CreateContentDto } from './dto/create-content.dto';
import { Content } from './../entity/content.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  /**
   * 컨텐츠 생성
   * --
   * @param contentInfo
   * @returns
   */
  async createContent(contentInfo: CreateContentDto) {
    try {
      const result = await this.contentRepository.save(contentInfo);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 컨텐츠 전체 목록 조회
   * --
   * @returns
   */
  async getContentList() {
    try {
      const result = await this.contentRepository.find();
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 작성자별 컨텐츠 목록 조회
   * --
   * @param user_id
   * @returns
   */
  async getContentByUser(user_id: string) {
    try {
      const result = await this.contentRepository.find({ where: { user_id } });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 컨텐츠 아이디로 조회
   * --
   * @param content_id
   * @returns
   */
  async getContentById(content_id: string) {
    try {
      const result = await this.contentRepository.findOneOrFail({
        order: { created_at: { direction: 'DESC' } },
        where: { content_id },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 컨텐츠 정보 수정
   * --
   * @param contentInfo
   * @returns
   */
  async updateContent(contentInfo: UpdateContentDto) {
    try {
      const { content_id, ...updateInfo } = contentInfo;
      await this.contentRepository.findOneOrFail({ where: { content_id } });

      const result = await this.contentRepository.update(
        { content_id },
        updateInfo,
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 컨텐츠 NFT 발급
   * --
   * @param content_id
   * @returns
   */
  async mintContent(content_id: string) {
    try {
      await this.contentRepository.findOneOrFail({ where: { content_id } });
      const result = await this.contentRepository.update(
        { content_id },
        { isNFT: true },
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   *컨텐츠 삭제
   * --
   * @param content_id
   * @returns
   */
  async deleteContent(content_id: string) {
    try {
      await this.contentRepository.findOneOrFail({ where: { content_id } });
      const result = await this.contentRepository.delete(content_id);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
