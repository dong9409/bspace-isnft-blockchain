import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';
import {
  IPFSFile,
  IPFSJson,
  LoadingContext,
  PinataManager,
} from '../../../utils';
import {  mintNFT } from '../../../utils/Web3Manager';

type Props = {};

const MainPresenter = (props: Props) => {
  const { eventLoading } = useContext(LoadingContext);
  /* Router */
  const navigation = useNavigate();
  /* State */
  // const [fileInfo, setFileInfo] = useState<File | null>(null);
  // const { isLoading, handleLoading } = useContext(LoadingContext);
  /* Functions */
  const handlePage = () => {
    eventLoading(null, 1000);
    navigation('/creation');
  };
  const [fileInfo, setFileInfo] = useState<File | null>(null);
  const { isLoading, handleLoading } = useContext(LoadingContext);

  /* Functions */
  const handleTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileInfo) {
      return;
    }
    handleLoading(true);
    const pm = new PinataManager();
    const postData: IPFSFile = {
      file_name: 'test',
      file_object: fileInfo,
      metadata: 'test',
    };
    const imgIPFSResult = await pm.sendFileToIPFS(postData);
    if (!imgIPFSResult) {
      // when IPFS upload failed
      handleLoading(false);
      return;
    }
    const { IpfsHash } = imgIPFSResult;
    const metaData: IPFSJson = {
      name: 'test',
      image: `https://gateway.pinata.cloud/ipfs/${IpfsHash}`,
      description: 'this is test image',
      attributes: [
        {
          metaDataHash: 'exampleHash',
        },
      ],
    };
    const mdIPFSResult = await pm.pinJSONToIPFS(metaData);
    handleLoading(false);
    if (!mdIPFSResult) {
      // when IPFS upload failed
      return;
    }
    const pinataUrl =
      'https://gateway.pinata.cloud/ipfs/' + mdIPFSResult.IpfsHash;
    const txHash = await mintNFT(pinataUrl);
    console.log(txHash);
  };

  // const handleTest = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!fileInfo) {
  //     return;
  //   }
  //   handleLoading(true);
  //   const pm = new PinataManager();
  //   const postData: IPFSFile = {
  //     file_name: 'test',
  //     file_object: fileInfo,
  //     metadata: 'test',
  //   };
  //   const result = await pm.sendFileToIPFS(postData);
  //   if (result) {
  //     console.log(result);
  //     handleLoading(false);
  //   }
  // };

  // const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const target = e.currentTarget;
  //   const files = (target.files as FileList)[0];
  //   setFileInfo(files);
  // };
  /* Hooks */
  /* Render */
  return (
    <div className="main-container">
      <Result
        icon={<SmileOutlined />}
        title="현재 프로토타이핑중에 있습니다!"
        extra={
          <Button type="primary" onClick={handlePage}>
            서비스 체험하러 가기
          </Button>
        }
      />
    </div>
  );
};

export default MainPresenter;
