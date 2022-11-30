import { User } from './../../entity/user.entity';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(config: ConfigService, userRepository: Repository<User>);
    validate(payload: {
        id: string;
        type: string;
    }): Promise<User>;
}
export {};
