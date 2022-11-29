package contract

import (
	"encoding/json"
	"net/http"

	request "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/contract/dto/request"
	response "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/contract/dto/response"
	UserService "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/service"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

<<<<<<< HEAD:isnft-blockchain/chaincode/user/contract/create.go
// CreateUserData is method to create post for board
func (uc *UserChaincode) CreateUserData(ctx contractapi.TransactionContextInterface, rawUserCreateRequest string) *response.ChaincodeResponse {
	var UserCreateRequest request.UserCreateRequest

	chaincodeResponse := response.ChaincodeResponse{
		ChaincodeResult: rawUserCreateRequest,
	}

	err := json.Unmarshal([]byte(rawUserCreateRequest), &UserCreateRequest)
=======
// CreateIsNFTData is method to create post for board
func (ic *IsNFTChaincode) CreateIsNFTData(ctx contractapi.TransactionContextInterface, rawContentCreateRequest string) *response.ChaincodeResponse {
	var ContentCreateRequest request.ContentCreateRequest

	chaincodeResponse := response.ChaincodeResponse{
		ChaincodeResult: rawContentCreateRequest,
	}

	err := json.Unmarshal([]byte(rawContentCreateRequest), &ContentCreateRequest)
>>>>>>> 81a35c963563d13699748ab2721e6af35e2f6d44:isnft-blockchain/chaincode/isnft/contract/create.go
	if err != nil {
		chaincodeResponse.Status = "not available DTO"
		chaincodeResponse.StatusCode = http.StatusInternalServerError
		return &chaincodeResponse
	}

<<<<<<< HEAD:isnft-blockchain/chaincode/user/contract/create.go
	err = UserService.Create(ctx, UserCreateRequest)
=======
	err = IsNFTService.Create(ctx, ContentCreateRequest)
>>>>>>> 81a35c963563d13699748ab2721e6af35e2f6d44:isnft-blockchain/chaincode/isnft/contract/create.go
	if err != nil {
		chaincodeResponse.Status = err.Error()
		chaincodeResponse.StatusCode = http.StatusInternalServerError
	} else {
		chaincodeResponse.Status = "OK"
		chaincodeResponse.StatusCode = http.StatusOK
	}

	return &chaincodeResponse
}
