package contract

import (
	"encoding/json"
	"fmt"

	model "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/phash/model"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

//InitLedger ...
func (pc *PhashChaincode) InitLedger(ctx contractapi.TransactionContextInterface) error {
	var initData = model.Phash{
		"phash", "contid", "afawef3aw5e1fa35sf1",
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
