import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Response } from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(res: Response, userInfo: CreateUserDTO): Promise<Response<any, Record<string, any>>>;
    getUserList(res: Response): Promise<Response<any, Record<string, any>>>;
    getUserDetail(res: Response, user_id: string): Promise<Response<any, Record<string, any>>>;
    updateUser(res: Response, userInfo: UpdateUserDTO): Promise<Response<any, Record<string, any>>>;
    deleteUser(res: Response, user_id: string): Promise<Response<any, Record<string, any>>>;
}
