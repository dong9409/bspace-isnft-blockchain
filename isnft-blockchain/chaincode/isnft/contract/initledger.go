package contract

import (
	"encoding/json"
	"fmt"

	"github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/isnft/model"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

//InitLedger ...
func (ic *IsNFTChaincode) InitLedger(ctx contractapi.TransactionContextInterface) error {
	var initData = model.IsNFTData{
		"lwm2m", "data1", "initSensor", "from", "to", "time1",
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
