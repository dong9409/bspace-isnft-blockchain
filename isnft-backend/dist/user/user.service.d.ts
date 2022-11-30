import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { User, USER_TPYE } from 'src/entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(userInfo: CreateUserDTO): Promise<{
        user_pw: string;
        user_id: string;
        user_nm: string;
        user_type: USER_TPYE;
    } & User>;
    getUserList(): Promise<User[]>;
    getUserDetail(user_id: string): Promise<User>;
    updateUser(userInfo: UpdateUserDTO): Promise<import("typeorm").UpdateResult>;
    deleteUser(user_id: string): Promise<import("typeorm").DeleteResult>;
}
