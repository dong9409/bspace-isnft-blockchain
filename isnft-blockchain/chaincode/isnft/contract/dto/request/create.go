package dto

// ContentCreateRequest ...
type ContentCreateRequest struct {
	UserID			string `json:"user_id"`
	ContentTitle	string `json:"content_title"`
	ContentDESC		string `json:"content_desc"`
	EventList		string `json:"event_list"`
	ContentURL		string `json:"content_url"`
	ContentWidth	string `json:"content_width"`
	ContentHeight	string `json:"content_height"`
	NftAddress		string `json:"nft_address"`
}
