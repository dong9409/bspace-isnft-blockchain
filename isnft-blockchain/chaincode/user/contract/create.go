package contract

import (
	"encoding/json"
	"net/http"

	request "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/contract/dto/request"
	response "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/contract/dto/response"
	UserService "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/service"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// CreateUserData is method to create post for board
func (uc *UserChaincode) CreateUserData(ctx contractapi.TransactionContextInterface, rawUserCreateRequest string) *response.ChaincodeResponse {
	var UserCreateRequest request.UserCreateRequest

	chaincodeResponse := response.ChaincodeResponse{
		ChaincodeResult: rawUserCreateRequest,
	}

	err := json.Unmarshal([]byte(rawUserCreateRequest), &UserCreateRequest)
	if err != nil {
		chaincodeResponse.Status = "not available DTO"
		chaincodeResponse.StatusCode = http.StatusInternalServerError
		return &chaincodeResponse
	}

	err = UserService.Create(ctx, UserCreateRequest)
	if err != nil {
		chaincodeResponse.Status = err.Error()
		chaincodeResponse.StatusCode = http.StatusInternalServerError
	} else {
		chaincodeResponse.Status = "OK"
		chaincodeResponse.StatusCode = http.StatusOK
	}

	return &chaincodeResponse
}
