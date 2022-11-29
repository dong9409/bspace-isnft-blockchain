#!/bin/bash

function playground_fabric {
    INCLUDE_CA=$1
    sudo bash ./blockchain/blockchain.sh all $INCLUDE_CA
}

function playground_invoke {
    CHANNEL=$1
    CHAINCODE_NAME=$2
    sudo bash ./blockchain/blockchain.sh invoke $CHANNEL $CHAINCODE_NAME
}

function playground_query {
    CHANNEL=$1
    CHAINCODE_NAME=$2
    sudo bash ./blockchain/blockchain.sh query $CHANNEL $CHAINCODE_NAME
}

function playground_clear {
    docker rm -f -v `docker ps -aqf "name=ca.btp.example.com"`
    docker rm -f -v `docker ps -aqf "name=cli.peer0.btp.example.com"`
    docker rm -f -v `docker ps -aqf "name=couchdb.peer0.btp.example.com"`
    docker rm -f -v `docker ps -aqf "name=btp-peer0.btp.example.com/*"`
    docker rm -f -v `docker ps -aqf "name=orderer0.example.com"`
    docker rm -f -v `docker ps -aqf "name=peer0.btp.example.com"`
    docker rm -f -v `docker ps -aqf "name=ca.btp.example.com"`
    docker rm -f -v `docker ps -aqf "name=cli.peer1.btp.example.com"`
    docker rm -f -v `docker ps -aqf "name=couchdb.peer1.btp.example.com"`
    docker rm -f -v `docker ps -aqf "name=btp-peer1.btp.example.com/*"`
    docker rm -f -v `docker ps -aqf "name=orderer0.example.com"`
    docker rm -f -v `docker ps -aqf "name=peer1.btp.example.com"`
    # docker rmi -f  `docker ps -aqf "name=ca.btp.example.com"`
    # docker rmi -f  `docker ps -aqf "name=cli.peer0.btp.example.com"`
    # docker rmi -f  `docker ps -aqf "name=couchdb.peer0.btp.example.com"`
    # docker rmi -f  `docker ps -aqf "name=btp-peer0.btp.example.com/*"`
    # docker rmi -f  `docker ps -aqf "name=orderer0.example.com"`
    # docker rmi -f  `docker ps -aqf "name=peer0.btp.example.com"`
    sleep 3s
    sudo bash ./blockchain/blockchain.sh clean
}

function playground_restart {
    INCLUDE_CA=$1
    playground_clear
    sleep 1s
    playground_fabric $INCLUDE_CA
}

function playground_usage {
    cecho "RED" "you should use fabric | clear | invoke | query | restart"
}

function main {
    case $1 in
        fabric | clear | invoke | query | restart)
            cmd=playground_$1
            shift
            $cmd $@
            ;;
        *)
            playground_usage
            exit
            ;;
    esac
}

main $@