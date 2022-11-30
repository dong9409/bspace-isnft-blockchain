package contract

import (
	"encoding/json"
	"net/http"

	response "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/phash/contract/dto/response"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

//PhashChaincode ...
type PhashChaincode struct {
	contractapi.Contract
}

//InitProcessing ...
func InitProcessing(rawPhashRequest string) (interface{}, response.ChaincodeResponse) {
	var PhashRequest interface{}
	boilerPlateResponse := response.ChaincodeResponse{
		ChaincodeResult: rawPhashRequest,
	}

	err := json.Unmarshal([]byte(rawPhashRequest), &PhashRequest)

	if err != nil {
		boilerPlateResponse.Status = "초기화 작업 실패"
		boilerPlateResponse.StatusCode = http.StatusInternalServerError
	}

	return PhashRequest, boilerPlateResponse
}
