package service

import (
	"encoding/json"
	"errors"

	request "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/contract/dto/request"
	"github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/logger"
	model "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/model"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// Create ...
func Create(ctx contractapi.TransactionContextInterface, ucr request.UserCreateRequest) error {
	userModel := model.NewUser()
	userModel.SetUserID(ucr.UserID)
	userModel.SetUserNm(ucr.UserNm)
	userModel.SetUserPw(ucr.UserPw)
	userModel.SetCreatedAt(ucr.CreatedAt)
	userModel.SetModifiedAt(ucr.ModifiedAt)
	userModel.SetUserType(ucr.UserType)

	if userModel.GetUserID() == "" {
		logger.Error("There is no [user_id]")
		return errors.New("There is no [user_id]")
	}
	if userModel.GetUserNm() == "" {
		logger.Error("There is no [user_nm]")
		return errors.New("There is no [user_nm]")
	}
	if userModel.GetUserPw() == "" {
		logger.Error("There is no [user_pw]")
		return errors.New("There is no [user_pw]")
	}
	if userModel.GetCreatedAt() == "" {
		logger.Error("There is no [created_at]")
		return errors.New("There is no [created_at]")
	}
	if userModel.GetModifiedAt() == "" {
		logger.Error("There is no [modified_at]")
		return errors.New("There is no [modified_at]")
	}
	if userModel.GetUserType() == "" {
		logger.Error("There is no [user_type]")
		return errors.New("There is no [user_type]")
	}

	result, err := json.Marshal(userModel)
	if err != nil {
		logger.Error(err.Error())
		return errors.New("Json encoding failed")
	}

	err = ctx.GetStub().PutState(userModel.GetKey(), result)
	if err != nil {
		logger.Error(err.Error())
		return errors.New("Putstate error")
	}

	return nil
}
