package main

import (
	"github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/contract"
	"github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/user/logger"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

func main() {
	userChaincode, err := contractapi.NewChaincode(&contract.UserChaincode{})
	if err != nil {
		logger.Error("Error creating board chaincode")
		panic(err)
	}
	logger.Info("Generate ipe chaincode")

	if err := userChaincode.Start(); err != nil {
		logger.Error("Error starting board chaincode:")
		panic(err)
	}
	logger.Info("Strart board chaincode")
}
