package contract

import (
	"net/http"

	response "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/phash/contract/dto/response"
	PhashService "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/phash/service"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// GetUserData is method to create post for board
func (pc *PhashChaincode) GetPhashList(ctx contractapi.TransactionContextInterface) *response.ChaincodeResponse {

	chaincodeResponse := response.ChaincodeResponse{
		ChaincodeResult: "",
	}

	data, err := PhashService.GetPhashList(ctx)
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
