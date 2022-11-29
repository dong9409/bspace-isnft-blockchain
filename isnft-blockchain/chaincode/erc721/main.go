package main

import (
	"github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/erc721/contract"
	"github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/erc721/logger"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

func main() {
	erc721Chaincode, err := contractapi.NewChaincode(&contract.ERC721Contract{})
	if err != nil {
		logger.Error("Error creating board chaincode")
		panic(err)
	}
	logger.Info("Generate erc721 chaincode")

	if err := erc721Chaincode.Start(); err != nil {
		logger.Error("Error starting board chaincode:")
		panic(err)
	}
	logger.Info("Strart board chaincode")
}
