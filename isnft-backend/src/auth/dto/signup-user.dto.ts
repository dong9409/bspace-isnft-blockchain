import { USER_TPYE } from 'src/entity';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpUserDTO {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  user_nm: string;

  @IsString()
  @IsOptional()
  user_pw?: string;

  @IsEnum(USER_TPYE)
  @IsNotEmpty()
  user_type: USER_TPYE;
}
