package model

import "strings"

//IsNFTData ...
type IsNFTData struct {
	Doctype string `json:"doctype"`
	Data    string `json:"data"`
	Sensor  string `json:"sensor"`
	From    string `json:"from"`
	To      string `json:"to"`
	Time    string `json:"time"`
}

//NewIsNFTData ...
func NewIsNFTData() *IsNFTData {
	return &IsNFTData{}
}

//GetData ...
func (l *IsNFTData) GetData() string {
	return l.Data
}

//GetSensor ...
func (l *IsNFTData) GetSensor() string {
	return l.Sensor
}

//GetFrom ...
func (l *IsNFTData) GetFrom() string {
	return l.From
}

//GetTo ...
func (l *IsNFTData) GetTo() string {
	return l.To
}

//GetTime ...
func (l *IsNFTData) GetTime() string {
	return l.Time
}

//GetDoctype ...
func (l *IsNFTData) GetDoctype() string {
	return l.Doctype
}

//GetKey ...
func (l *IsNFTData) GetKey() string {
	var sb strings.Builder
	sb.WriteString(l.Sensor)
	sb.WriteString("_")
	sb.WriteString(l.Time)
	return sb.String()
}

//SetData ...
func (l *IsNFTData) SetData(data string) error {
	l.Data = data
	return nil
}

//SetSensor ...
func (l *IsNFTData) SetSensor(sensor string) error {
	l.Sensor = sensor
	return nil
}

//SetTime ...
func (l *IsNFTData) SetTime(time string) error {
	l.Time = time
	return nil
}

//SetFrom ...
func (l *IsNFTData) SetFrom(from string) error {
	l.From = from
	return nil
}

//SetTo ...
func (l *IsNFTData) SetTo(to string) error {
	l.To = to
	return nil
}

//SetDoctype ...
func (l *IsNFTData) SetDoctype(doctype string) error {
	l.Doctype = doctype
	return nil
}
