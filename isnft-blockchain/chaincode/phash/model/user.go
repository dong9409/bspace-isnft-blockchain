package dto

import "strings"

// Phash ...
type Phash struct {
	Doctype   string `json:"doctype"`
	ContentID string `json:"content_id"`
	Phash     string `json:"phash"`
}

// NewPhash ...
func NewPhash() *Phash {
	return &Phash{Doctype: "phash"}
}

func (p *Phash) GetKey() string {
	var sb strings.Builder
	sb.WriteString(p.ContentID)
	return sb.String()
}

func (p *Phash) GetContentID() string {
	return p.ContentID
}

func (p *Phash) GetPhash() string {
	return p.Phash
}

func (p *Phash) SetContentID(ContentID string) *Phash {
	p.ContentID = ContentID
	return p
}

func (p *Phash) SetPhash(Phash string) *Phash {
	p.Phash = Phash
	return p
}
