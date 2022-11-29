package service

import (
	"encoding/json"
	"errors"

	request "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/isnft/contract/dto/request"
	"github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/isnft/logger"
	"github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/isnft/model"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// Create ...
func Create(ctx contractapi.TransactionContextInterface, lcr request.IsNFTDataCreateRequest) error {
	isNFTModel := model.NewIsNFTData()
	isNFTModel.SetDoctype("IsNFT")
	isNFTModel.SetData(lcr.Data)
	isNFTModel.SetSensor(lcr.Sensor)
	isNFTModel.SetFrom(lcr.From)
	isNFTModel.SetTo(lcr.To)
	isNFTModel.SetTime(lcr.Time)

	if isNFTModel.GetData() == "" {
		logger.Error("There is no [data]")
		return errors.New("There is no [data]")
	}
	if isNFTModel.GetSensor() == "" {
		logger.Error("There is no [sensor]")
		return errors.New("There is no [sensor]")
	}
	if isNFTModel.GetFrom() == "" {
		logger.Error("There is no [from]")
		return errors.New("There is no [from]")
	}
	if isNFTModel.GetTo() == "" {
		logger.Error("There is no [to]")
		return errors.New("There is no [to]")
	}
	if isNFTModel.GetTime() == "" {
		logger.Error("There is no [time]")
		return errors.New("There is no [time]")
	}

	result, err := json.Marshal(isNFTModel)
	if err != nil {
		logger.Error(err.Error())
		return errors.New("Json encoding failed")
	}

	err = ctx.GetStub().PutState(isNFTModel.GetKey(), result)
	if err != nil {
		logger.Error(err.Error())
		return errors.New("Putstate error")
	}

	ctx.GetStub().SetEvent("createIsNFTData", []byte(result))

	return nil
}
