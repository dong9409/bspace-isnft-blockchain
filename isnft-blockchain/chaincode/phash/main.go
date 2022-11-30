package main

import (
	"github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/phash/contract"
	"github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/phash/logger"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

func main() {
	phashChaincode, err := contractapi.NewChaincode(&contract.PhashChaincode{})
	if err != nil {
		logger.Error("Error creating phash chaincode")
		panic(err)
	}
	logger.Info("Generate phash chaincode")

	if err := phashChaincode.Start(); err != nil {
		logger.Error("Error starting phash chaincode:")
		panic(err)
	}
	logger.Info("Strart phash chaincode")
}
