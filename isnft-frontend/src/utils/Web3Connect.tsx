import React, { createContext, useEffect, useRef } from 'react';
import Web3 from 'web3';

const Web3Context = createContext<any>(null);

export { Web3Context };

type Props = {
  children: React.ReactNode;
};

const Web3Connect = (props: Props) => {
  /* Router */
  /* State */
  const { children } = props;
  const web3 = useRef<Web3 | undefined>();
  /* Functions */
  /**
   * 민팅
   * @returns
   */
  const handleMint = () => {
    // Todo
    console.log(1);
    return true;
  };

  /**
   * 메타마스크 연결
   * --
   * @returns
   */
  const handleConnect = async () => {
    if (!window.ethereum) {
      return;
    }
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    return accounts;
  };

  /* Hooks */
  useEffect(() => {
    if (web3.current) {
      return;
    }
    // web3.current = new Web3(window.web3.currentProvider);
    // console.log(web3.current);
  }, []);
  /* Render */
  return (
    <Web3Context.Provider value={{ handleMint, handleConnect }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Connect;
