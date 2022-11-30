package service

import (
	"encoding/json"
	"errors"

	"github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/phash/logger"
	model "github.com/bspace-isnft-blockchain/isnft-blockchain/chaincode/phash/model"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// GetPhashList ...
func GetPhashList(ctx contractapi.TransactionContextInterface) (string, error) {
	queryString := `{"selector":{"doctype":"phash"},"sort":[{"phash":"desc"}],"use_index":["_design/indexPhashDoc","indexPhash"]}`
	resultsIterator, err := ctx.GetStub().GetQueryResult(queryString)
	if err != nil {
		logger.Error(err.Error())
		return "", errors.New("iterator 정보를 가져오는데 실패함")
	}
	defer resultsIterator.Close()

	var phashes []*model.Phash
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			logger.Error(err.Error())
			return "", errors.New("다음 iterator 정보를 가져오는데 실패함")
		}
		var phash model.Phash
		err = json.Unmarshal(queryResponse.Value, &phash)
		if err != nil {
			logger.Error(err.Error())
			return "", errors.New("JSON 디코딩에 실패함")
		}
		phashes = append(phashes, &phash)
	}

	phasheBytes, err := json.Marshal(phashes)
	if err != nil {
		logger.Error(err.Error())
		return "", errors.New("JSON 인코딩에 실패함")
	}

	return string(phasheBytes), nil

}
