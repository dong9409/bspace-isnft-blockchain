package contract

import (
	"encoding/json"
	"net/http"

	request "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/contract/dto/request"
	response "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/contract/dto/response"
	UserService "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/service"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// GetUserData is method to create post for board
func (uc *UserChaincode) GetUserData(ctx contractapi.TransactionContextInterface, rawUserGetByIDRequest string) *response.ChaincodeResponse {
	var UserGetByReaquest request.UserGetByIDRequest

	chaincodeResponse := response.ChaincodeResponse{
		ChaincodeResult: rawUserGetByIDRequest,
	}

	err := json.Unmarshal([]byte(rawUserGetByIDRequest), &UserGetByReaquest)
	if err != nil {
		chaincodeResponse.Status = "not available DTO"
		chaincodeResponse.StatusCode = http.StatusInternalServerError
		return &chaincodeResponse
	}

	data, err := UserService.GetUserByID(ctx, UserGetByReaquest)
	if err != nil {
		chaincodeResponse.Status = err.Error()
		chaincodeResponse.StatusCode = http.StatusInternalServerError
		chaincodeResponse.ChaincodeResult = data

	} else {
		chaincodeResponse.Status = "OK"
		chaincodeResponse.StatusCode = http.StatusOK
	}

	return &chaincodeResponse
}
