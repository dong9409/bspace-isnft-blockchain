import { USER_TPYE } from 'src/entity';
export declare class CreateUserDTO {
    user_id: string;
    user_nm: string;
    user_pw?: string;
    user_type: USER_TPYE;
}
