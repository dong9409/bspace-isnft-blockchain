# BTP testbed - Playground

## Hyperledger Fabric v2.2.4

Be careful. It is simply for building a blockchain environment, and `chaincode` and `fabric-client` need to be built separately.

- 1 orderer
- 1 peer & couchdb
- (optional) 1 fabric-ca

Start the Fabric network with the following command

```sh
# simple
./playgound.sh fabric

# with fabric-ca & client for API test
./playground.sh fabric --ca

# clear docker
./playground.sh fabric clear

# restart with fabric-ca
./playground.sh restart --ca

```

## Prerequisites

| tool           | version   |
| -------------- | --------- |
| git            | any       |
| docker-engine  | 19.03.13↑ |
| docker-compose | 1.27.4↑   |

> ![SmartM2M][id]

[id]: https://www.smartm2m.co.kr/wp-content/uploads/2021/02/logo.png "SmartM2M"
