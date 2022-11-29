package contract

import (
	"encoding/json"
	"fmt"

	model "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/model"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

//InitLedger ...
func (uc *UserChaincode) InitLedger(ctx contractapi.TransactionContextInterface) error {
	var initData = model.User{
		"dong9409", "김동규", "ababab", "2022-11-29", "2022-11-29", "EMAIL",
	}
	initDataAsBytes, err := json.Marshal(initData)
	ctx.GetStub().PutState("init", initDataAsBytes)
	if err != nil {
		return fmt.Errorf("저장에 실패함 %v", err)
	}
	if err != nil {
		return fmt.Errorf("JSON 인코딩에 실패함 %v", err)
	}
	return nil
}
