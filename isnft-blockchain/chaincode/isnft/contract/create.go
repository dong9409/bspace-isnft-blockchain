package contract

import (
	"encoding/json"
	"net/http"

	request "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/isnft/contract/dto/request"
	response "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/isnft/contract/dto/response"
	IsNFTService "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/isnft/service"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// CreateIsNFTData is method to create post for board
func (ic *IsNFTChaincode) CreateIsNFTData(ctx contractapi.TransactionContextInterface, rawContentCreateRequest string) *response.ChaincodeResponse {
	var ContentCreateRequest request.ContentCreateRequest

	chaincodeResponse := response.ChaincodeResponse{
		ChaincodeResult: rawContentCreateRequest,
	}

	err := json.Unmarshal([]byte(rawContentCreateRequest), &ContentCreateRequest)
	if err != nil {
		chaincodeResponse.Status = "not available DTO"
		chaincodeResponse.StatusCode = http.StatusInternalServerError
		return &chaincodeResponse
	}

	err = IsNFTService.Create(ctx, ContentCreateRequest)
	if err != nil {
		chaincodeResponse.Status = err.Error()
		chaincodeResponse.StatusCode = http.StatusInternalServerError
	} else {
		chaincodeResponse.Status = "OK"
		chaincodeResponse.StatusCode = http.StatusOK
	}

	return &chaincodeResponse
}
