package service

import (
	"errors"

	request "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/contract/dto/request"
	"github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/logger"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// GetUserByID ...
func GetUserByID(ctx contractapi.TransactionContextInterface, uir request.UserGetByIDRequest) (string, error) {
	if uir.UserID == "" {
		logger.Error("유효하지 않은 ID")
		return "", errors.New("유효하지 않은 ID")
	}
	rawUserData, err := ctx.GetStub().GetPrivateData("collectionUsers", uir.UserID)
	if err != nil {
		logger.Error(err.Error())
		return "", errors.New("해당 사용자를 찾을 수 없음")
	}
	if len(rawUserData) == 0 {
		logger.Error("해당 사용자를 찾을 수 없음")
		return "", errors.New("해당 사용자를 찾을 수 없음")
	}
	return string(rawUserData), nil
}
