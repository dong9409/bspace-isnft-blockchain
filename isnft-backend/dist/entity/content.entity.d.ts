import { User } from './user.entity';
export declare class Content {
    content_id: string;
    content_title: string;
    content_desc: string;
    event_list: string;
    content_url: string;
    isNFT: Boolean;
    content_width: number;
    content_height: number;
    nft_address: string;
    isVerify: Boolean;
    created_at: Date;
    modified_at: Date;
    user_id: string;
    user: User;
}
