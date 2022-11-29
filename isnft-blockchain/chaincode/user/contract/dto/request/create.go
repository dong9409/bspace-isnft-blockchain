package dto

// UserCreateRequest ...
type UserCreateRequest struct {
	UserID     string `json:"user_id"`
	UserNm     string `json:"user_nm"`
	UserPw     string `json:"user_pw"`
	CreatedAt  string `json:"created_at"`
	ModifiedAt string `json:"modified_at"`
	UserType   string `json:"user_type"`
}

// UserGetByIDRequest ...
type UserGetByIDRequest struct {
	UserID string `json:"user_id"`
}
