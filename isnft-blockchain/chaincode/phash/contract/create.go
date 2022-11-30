package contract

import (
	"encoding/json"
	"net/http"

	request "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/phash/contract/dto/request"
	response "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/phash/contract/dto/response"
	"github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/phash/logger"
	PhashService "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/phash/service"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// CreatePhashData is method to create post for board
func (pc *PhashChaincode) CreatePhashData(ctx contractapi.TransactionContextInterface, rawPhashCreateRequest string) *response.ChaincodeResponse {
	var phashCreateRequest request.PhashCreateRequest

	chaincodeResponse := response.ChaincodeResponse{
		ChaincodeResult: rawPhashCreateRequest,
	}

	err := json.Unmarshal([]byte(rawPhashCreateRequest), &phashCreateRequest)
	if err != nil {
		chaincodeResponse.Status = "not available DTO"
		chaincodeResponse.StatusCode = http.StatusInternalServerError
		return &chaincodeResponse
	}

	err = PhashService.Create(ctx, phashCreateRequest)
	logger.Info(rawPhashCreateRequest)
	if err != nil {
		chaincodeResponse.Status = err.Error()
		chaincodeResponse.StatusCode = http.StatusInternalServerError
	} else {
		chaincodeResponse.Status = "OK"
		chaincodeResponse.StatusCode = http.StatusOK
	}

	return &chaincodeResponse
}
