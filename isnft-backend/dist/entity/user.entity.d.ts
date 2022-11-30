export declare enum USER_TPYE {
    METAMASK = "METAMASK",
    EMAIL = "EMAIL"
}
export declare class User {
    user_id: string;
    user_nm: string;
    user_pw?: string;
    user_type: USER_TPYE;
    created_at: Date;
    modified_at: Date;
}
