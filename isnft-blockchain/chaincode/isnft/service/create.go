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
func Create(ctx contractapi.TransactionContextInterface, ccr request.ContentCreateRequest) error {
	isNFTModel := model.NewContent()
	isNFTModel.SetDoctype("IsNFT")
	isNFTModel.SetUserID(ccr.UserID)
	isNFTModel.SetContentTitle(ccr.ContentTitle)
	isNFTModel.SetContentDESC(ccr.ContentDESC)
	isNFTModel.SetEventList(ccr.EventList)
	isNFTModel.SetContentURL(ccr.ContentURL)
	isNFTModel.SetContentWidth(ccr.ContentWidth)
	isNFTModel.SetContentHeight(ccr.ContentHeight)
	isNFTModel.SetNftAddress(ccr.NftAddress)

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
