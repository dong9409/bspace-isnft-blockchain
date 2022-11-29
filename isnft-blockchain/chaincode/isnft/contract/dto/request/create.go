package dto

// IsNFTDataCreateRequest ...
type IsNFTDataCreateRequest struct {
	Data   string `json:"data"`
	Sensor string `json:"sensor"`
	From   string `json:"from"`
	To     string `json:"to"`
	Time   string `json:"time"`
}
