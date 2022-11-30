package service

import (
	"encoding/json"
	"errors"

	request "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/phash/contract/dto/request"
	"github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/phash/logger"
	model "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/phash/model"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// Create ...
func Create(ctx contractapi.TransactionContextInterface, pcr request.PhashCreateRequest) error {
	phashModel := model.NewPhash()
	phashModel.SetContentID(pcr.ContentID)
	phashModel.SetPhash(pcr.Phash)
	logger.Info(pcr.Phash)
	if phashModel.GetContentID() == "" {
		logger.Error("There is no [content_id]")
		return errors.New("There is no [content_id]")
	}
	if phashModel.GetPhash() == "" {
		logger.Error("There is no [phash]")
		return errors.New("There is no [phash]")
	}

	result, err := json.Marshal(phashModel)
	if err != nil {
		logger.Error(err.Error())
		return errors.New("Json encoding failed")
	}

	err = ctx.GetStub().PutState(phashModel.GetKey(), result)
	if err != nil {
		logger.Error(err.Error())
		return errors.New("Putstate error")
	}

	return nil
}
