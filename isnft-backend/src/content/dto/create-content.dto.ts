import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  content_title: string;

  @IsString()
  @IsNotEmpty()
  content_desc: string;

  @IsString()
  @IsOptional()
  event_list: string;

  @IsString()
  @IsOptional()
  content_url?: string;

  @IsNumber()
  @IsOptional()
  content_width?: number;

  @IsNumber()
  @IsOptional()
  content_height?: number;

  @IsString()
  @IsOptional()
  nft_address?: string;
}
