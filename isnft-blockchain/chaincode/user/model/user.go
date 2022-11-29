package dto

import "strings"

// User ...
type User struct {
	UserID     string `json:"user_id"`
	UserNm     string `json:"user_nm"`
	UserPw     string `json:"user_pw"`
	CreatedAt  string `json:"created_at"`
	ModifiedAt string `json:"modified_at"`
	UserType   string `json:"user_type"`
}

// NewUser ...
func NewUser() *User {
	return &User{}
}

func (c *User) GetKey() string {
	var sb strings.Builder
	sb.WriteString(c.UserID)
	sb.WriteString("_")
	sb.WriteString(c.ModifiedAt)
	sb.WriteString("_")
	sb.WriteString(c.UserType)
	return sb.String()
}

func (User *User) GetUserID() string {
	return User.UserID
}

func (User *User) GetUserNm() string {
	return User.UserNm
}

func (User *User) GetUserPw() string {
	return User.UserPw
}

func (User *User) GetCreatedAt() string {
	return User.CreatedAt
}

func (User *User) GetModifiedAt() string {
	return User.ModifiedAt
}

func (User *User) GetUserType() string {
	return User.UserType
}

func (User *User) SetUserID(UserID string) *User {
	User.UserID = UserID
	return User
}

func (User *User) SetUserNm(UserNm string) *User {
	User.UserNm = UserNm
	return User
}

func (User *User) SetUserPw(UserPw string) *User {
	User.UserPw = UserPw
	return User
}

func (User *User) SetCreatedAt(CreatedAt string) *User {
	User.CreatedAt = CreatedAt
	return User
}

func (User *User) SetModifiedAt(ModifiedAt string) *User {
	User.ModifiedAt = ModifiedAt
	return User
}

func (User *User) SetUserType(UserType string) *User {
	User.UserType = UserType
	return User
}
