package contract

import (
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

//InitLedger ...
func (uc *ERC721Contract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	ctx.GetStub().PutState("name", []byte("isNFT"))
	return nil
}
