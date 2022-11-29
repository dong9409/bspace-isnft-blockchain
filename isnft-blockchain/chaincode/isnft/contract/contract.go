package contract

import (
	"encoding/json"
	"net/http"

	response "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/isnft/contract/dto/response"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

//IsNFTChaincode ...
type IsNFTChaincode struct {
	contractapi.Contract
}

//InitProcessing ...
func InitProcessing(rawIsNFTRequest string) (interface{}, response.ChaincodeResponse) {
	var IsNFTRequest interface{}
	boilerPlateResponse := response.ChaincodeResponse{
		ChaincodeResult: rawIsNFTRequest,
	}

	err := json.Unmarshal([]byte(rawIsNFTRequest), &IsNFTRequest)

	if err != nil {
		boilerPlateResponse.Status = "초기화 작업 실패"
		boilerPlateResponse.StatusCode = http.StatusInternalServerError
	}

	return IsNFTRequest, boilerPlateResponse
}
