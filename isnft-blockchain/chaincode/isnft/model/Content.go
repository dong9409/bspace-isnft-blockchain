package model

import "strings"

//Content ...
type Content struct {
	Doctype			string `json:"doctype"`
	UserID			string `json:"user_id"`
	ContentTitle	string `json:"content_title"`
	ContentDESC		string `json:"content_desc"`
	EventList		string `json:"event_list"`
	ContentURL		string `json:"content_url"`
	ContentWidth	string `json:"content_width"`
	ContentHeight	string `json:"content_height"`
	NftAddress		string `json:"nft_address"`
}

//NewContent ...
func NewContent() *Content {
	return &Content{}
}

//GetUserID ...
func (c *Content) GetUserID() string {
	return c.UserID
}

//GetContentTitle ...
func (c *Content) GetContentTitle() string {
	return c.ContentTitle
}

//GetContentDESC ...
func (c *Content) GetContentDESC() string {
	return c.ContentDESC
}

//GetEventList ...
func (c *Content) GetEventList() string {
	return c.EventList
}

//GetContentURL ...
func (c *Content) GetContentURL() string {
	return c.ContentURL
}

//GetContentWidth ...
func (c *Content) GetContentWidth() string {
	return c.ContentWidth
}

//GetContentHeight...
func (c *Content) GetContentHeight() string {
	return c.ContentHeight
}

//GetNftAddress...
func (c *Content) GetNftAddress() string {
	return c.NftAddress
}

//GetKey ...
func (c *Content) GetKey() string {
	var sb strings.Builder
	sb.WriteString(c.ContentURL)
	sb.WriteString("_")
	sb.WriteString(c.NftAddress)
	return sb.String()
}

//SetUserID ...
func (c *Content) SetUserID(data string) error {
	c.UserID = data
	return nil
}

//SetContentTitle ...
func (c *Content) SetContentTitle(data string) error {
	c.ContentTitle = data
	return nil
}
	
//SetContentDESC ...
func (c *Content) SetContentDESC(data string) error {
	c.ContentDESC = data
	return nil
}
//SetEventList ...
func (c *Content) SetEventList(data string) error {
	c.EventList = data
	return nil
}
//SetContentURL ...
func (c *Content) SetContentURL(data string) error {
	c.ContentURL = data
	return nil
}
//SetContentWidth ...
func (c *Content) SetContentWidth(data string) error {
	c.ContentWidth = data
	return nil
}
//SetContentHeight ...
func (c *Content) SetContentHeight(data string) error {
	c.ContentHeight = data
	return nil
}
//SetNftAddress...
func (c *Content) SetNftAddress(data string) error {
	c.NftAddress = data
	return nil
}

//SetDoctype ...
func (c *Content) SetDoctype(doctype string) error {
	c.Doctype = doctype
	return nil
}
