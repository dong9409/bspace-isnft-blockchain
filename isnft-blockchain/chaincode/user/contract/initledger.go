package contract

import (
	"encoding/json"
	"fmt"

	model "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/model"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

//InitLedger ...
<<<<<<< HEAD:isnft-blockchain/chaincode/user/contract/initledger.go
func (uc *UserChaincode) InitLedger(ctx contractapi.TransactionContextInterface) error {
	var initData = model.User{
		"dong9409", "김동규", "ababab", "2022-11-29", "2022-11-29", "EMAIL",
=======
func (ic *IsNFTChaincode) InitLedger(ctx contractapi.TransactionContextInterface) error {
	var initData = model.Content{
		"isnft", "id1", "title1", "desc1", "event1", "url1", "width1", "height1", "address1",
>>>>>>> 81a35c963563d13699748ab2721e6af35e2f6d44:isnft-blockchain/chaincode/isnft/contract/initledger.go
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
