import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { USER_TPYE } from 'src/entity';
export class SignInUserDTO {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsOptional()
  user_pw?: string;

  @IsEnum(USER_TPYE)
  @IsNotEmpty()
  user_type: USER_TPYE;
}
