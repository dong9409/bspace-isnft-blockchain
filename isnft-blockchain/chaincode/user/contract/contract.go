package contract

import (
	"encoding/json"
	"net/http"

	response "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/contract/dto/response"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

//Userhaincode ...
type UserChaincode struct {
	contractapi.Contract
}

//InitProcessing ...
func InitProcessing(rawUserRequest string) (interface{}, response.ChaincodeResponse) {
	var UserRequest interface{}
	boilerPlateResponse := response.ChaincodeResponse{
		ChaincodeResult: rawUserRequest,
	}

	err := json.Unmarshal([]byte(rawUserRequest), &UserRequest)

	if err != nil {
		boilerPlateResponse.Status = "초기화 작업 실패"
		boilerPlateResponse.StatusCode = http.StatusInternalServerError
	}

	return UserRequest, boilerPlateResponse
}
