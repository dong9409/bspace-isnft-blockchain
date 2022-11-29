import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateContentDto {
  @IsString()
  @IsNotEmpty()
  content_id: string;

  @IsString()
  @IsOptional()
  content_title?: string;

  @IsString()
  @IsOptional()
  content_desc?: string;

  @IsString()
  @IsOptional()
  event_list?: string;

  @IsString()
  @IsOptional()
  content_url?: string;

  @IsBoolean()
  @IsOptional()
  isNFT?: Boolean;

  @IsBoolean()
  @IsOptional()
  isVerify?: Boolean;

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
