package contract

import (
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

//Init ...
func (uc *ERC721Contract) Init(ctx contractapi.TransactionContextInterface) error {
	ctx.GetStub().PutState("name", []byte("isNFT"))
	return nil
}
