import { USER_TPYE } from 'src/entity';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsOptional()
  user_nm?: string;

  @IsString()
  @IsOptional()
  user_pw?: string;

  @IsEnum(USER_TPYE)
  @IsOptional()
  user_type?: USER_TPYE;
}
