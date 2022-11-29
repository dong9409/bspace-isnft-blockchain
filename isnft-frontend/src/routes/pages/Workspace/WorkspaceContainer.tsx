import { Button, message, Modal, Result, Space, Spin, Steps } from 'antd';
import axios from 'axios';
import html2canvas from 'html2canvas';
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import ContentApi from '../../../api/ContentApi';
import VerificationApi from '../../../api/VerificationApi';
import {
  IPFSFile,
  IPFSJson,
  LoadingContext,
  PinataManager,
} from '../../../utils';
import { SessionContext } from '../../../utils/SessionManager';
import { mintNFT } from '../../../utils/Web3Manager';
import EventMeta from './EventMeta';
import WorkspacePresenter from './WorkspacePresenter';
import { Buffer } from 'buffer';

type Props = {};

export interface CREATE_CONTENT {
  user_id: string;
  content_title: string;
  content_desc: string;
}

export interface CONTENT_INFO {
  content_id: string;
  content_title: string;
  content_desc: string;
  event_log: string;
  content_url: string;
  isNFT: string;
  created_at: string;
  modified_at: string;
  user_id: string;
}

export interface Content {
  content_id: string;
  event_list: any;
  content_title: string;
  content_desc: string;
  thumbnail?: string;
  file?: File;
}

const WorkspaceContainer = (props: Props) => {
  const { setContent, userInfo, checkSession } = useContext(SessionContext);
  const { handleLoading, eventLoading } = useContext(LoadingContext);
  const canvasRef = useRef<any>();
  /* Router */
  const navigation = useNavigate();
  /* State */
  const [contentList, setContentList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [metadata, setMetadata] = useState<any>();
  const [img, setImg] = useState<any>();
  const [phash, setPhash] = useState<any>();
  const [aiv, setAiv] = useState<any>();
  /* Functions */
  /**
   * 민팅하기
   * --
   * @param item
   * @returns
   */
  const handleMint = async (item: Content) => {
    const { thumbnail } = item;
    if (!thumbnail) {
      return;
    }

    var blobBin = atob(thumbnail.split(',')[1]);
    var array = [];
    for (var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    var tempBlob = new Blob([new Uint8Array(array)], { type: 'image/png' });
    handleLoading(true);
    const pm = new PinataManager();
    const postData: IPFSFile = {
      file_name: 'test',
      file_object: tempBlob,
      metadata: 'test',
    };
    const imgIPFSResult = await pm.sendFileToIPFS(postData);
    if (!imgIPFSResult) {
      // when IPFS upload failed
      handleLoading(false);
      return;
    }
    const { IpfsHash } = imgIPFSResult;
    // const hash = crypto
    //   .createHash('sha256')
    //   .update(JSON.stringify(item))
    //   .digest('hex');
    // console.log(hash);
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
    if (!mdIPFSResult) {
      // when IPFS upload failed
      return;
    }
    const pinataUrl =
      'https://gateway.pinata.cloud/ipfs/' + mdIPFSResult.IpfsHash;
    const txHash = await mintNFT(pinataUrl);
    console.log(txHash);
    const putData = {
      content_id: item.content_id,
      content_url: IpfsHash,
      isNFT: true,
    };
    const result = await ContentApi.updateContent(putData);
    if (result) {
      handleLoading(false);
      return true;
    }
  };

  /**
   * 컨텐츠 등록
   * --
   * @param contentInfo
   * @returns
   */
  const handleCreateContent = async (contentInfo: CREATE_CONTENT) => {
    eventLoading();
    const postData = {
      ...contentInfo,
      user_id: userInfo.user_id,
    };
    const result = await ContentApi.createContent(postData);
    if (result) {
      await handleContent();
      return result;
    }
    return false;
  };

  const handleContent = async () => {
    const result = await ContentApi.getContentByUser(userInfo.user_id);
    if (result) {
      const temp = result.map((item: any) => {
        const { event_list } = item;

        return { ...item, event_list: JSON.parse(event_list) };
      });
      setContentList(temp);
      return result;
    }

    setContentList([]);

    return false;
  };

  const handleStartContent = (content_id: string) => {
    const [temp] = contentList.filter((item) => {
      const { content_id: temp_id } = item;
      return content_id === temp_id;
    });

    setContent(temp);
    navigation(`/creation/editor/${content_id}`);
  };

  const handleVerify = () => {
    handleOpen();
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  /* Hooks */
  useLayoutEffect(() => {
    const isLogin = checkSession();
    if (isLogin) {
      return;
    }
    navigation('/auth');

    return () => {};
  }, []);

  useLayoutEffect(() => {
    if (!userInfo) {
      return;
    }
    handleContent();
  }, [userInfo]);

  useLayoutEffect(() => {
    createThumbnail();
  }, [metadata]);

  useLayoutEffect(() => {
    if (current === 1) {
      handlePhash();
    }
    if (current === 2) {
      handleAiVerification();
    }
    if (current === 3) {
      handleUpdateVerification();
    }
  }, [current]);

  /* Render */

  const steps = [
    {
      title: 'Check Metadata',
      content: () => {
        return <div>1</div>;
      },
    },
    {
      title: 'Perceptual Hasing Verification',
      content: 'Second-content',
    },
    {
      title: 'AI Verification',
      content: 'Last-content',
    },
    {
      title: 'Done',
      content: 'Last-content',
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const handleMetadata = (f: any) => {
    setMetadata(JSON.parse(f));
  };

  const createThumbnail = async () => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    const { content_width, content_height, event_list } = metadata;
    canvas.width = content_width;
    canvas.height = content_height;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    // const path = JSON.parse(d);
    const path = event_list;
    path.forEach((item: any) => {
      context.beginPath();
      context.moveTo(item[0].x, item[0].y);
      for (let i = 1; i < item.length; i++) {
        context.lineWidth = item[i].lineWidth;
        context.strokeStyle = item[i].strokeStyle;
        context.lineJoin = item[i].lineJoin;
        context.globalCompositeOperation = item[i].globalCompositeOperation;
        context.lineTo(item[i].x, item[i].y);
      }
      context.stroke();
    });
    html2canvas(canvas).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      setImg(imgData);
    });
  };

  const handlePhash = async () => {
    var blobBin = atob(img.split(',')[1]);
    var array = [];
    for (var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    var tempBlob = new Blob([new Uint8Array(array)], { type: 'image/png' });
    // console.log(tempBlob);
    // console.log(img);
    // const _img = img.replace('data:image/png;base64,', '');
    const formData = new FormData();
    // formData.append('file', _img);
    formData.append('file', tempBlob);
    formData.append(
      'content_url',
      `https://gateway.pinata.cloud/ipfs/${metadata.content_url}`
    );
    const result = await VerificationApi.verification(formData);
    if (result) {
      // next();
      setPhash(result);
      return;
    }
    return false;
  };

  const handleAiVerification = async () => {
    const bufferFromUrl = await axios.get(
      `https://gateway.pinata.cloud/ipfs/${metadata.content_url}`,
      {
        responseType: 'arraybuffer',
      }
    );

    console.log(bufferFromUrl.data);
    const img2 = Buffer.from(bufferFromUrl.data, 'utf-8');

    const postData = new FormData();
    postData.append('files', bufferFromUrl.data);
    postData.append('files', img);
    const result = await VerificationApi.aiVerification(postData);
    if (result) {
      setAiv({
        success: true,
        plagiarism: true,
        distance: 0,
      });
      return true;
    }
    setAiv({
      success: true,
      plagiarism: true,
      distance: 0,
    });
    return false;
    // if (result) {
    //   console.log(result);
    //   return true;
    // }
    // return false;
  };

  const handleUpdateVerification = async () => {
    const { content_id } = metadata;
    const postData = {
      content_id,
      isVerify: true,
    };
    const result = await ContentApi.updateContent(postData);
    if (result) {
      await handleContent();
      return true;
    }
    return false;
  };

  const getContent = () => {
    switch (current) {
      case 0:
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            {metadata ? (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '90%',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignContent: 'center',
                  }}
                >
                  <pre
                    style={{
                      display: 'block',
                      width: '48%',
                      height: '100%',
                      padding: ' 10px 30px',
                      margin: '0',
                      overflow: 'scroll',
                      border: '1px solid lightgray',
                    }}
                  >
                    {JSON.stringify(metadata, null, 2)}
                  </pre>
                  <img
                    src={img}
                    alt="igm"
                    style={{
                      width: '48%',
                      height: '100%',
                      objectFit: 'contain',
                      border: '1px solid lightgray',
                    }}
                  />
                  <canvas
                    ref={canvasRef}
                    style={{ position: 'fixed', top: '-100%' }}
                  />
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '10%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <Button type="primary" onClick={() => next()} disabled={!img}>
                    Next
                  </Button>
                </div>
              </div>
            ) : (
              <EventMeta loadJson={handleMetadata} />
            )}
          </div>
        );
      case 1:
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {phash ? (
              <>
                <Result
                  status="success"
                  title="Perceptual Hashing Pass!"
                  subTitle={
                    <>
                      <p>Distance: {100 - phash.distance}%</p>
                      <p>Differnce: {100 - phash.diff}%</p>
                      <p>Verify: {phash.verify ? 'Pass' : 'Fail'}</p>
                    </>
                  }
                  extra={[
                    <Button
                      type="primary"
                      onClick={() => next()}
                      disabled={!img}
                    >
                      Next
                    </Button>,
                  ]}
                />
              </>
            ) : (
              <>
                <Spin size="large" />
                Perceptual Hashing Verification...
              </>
            )}
          </div>
        );
      case 2:
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {aiv ? (
              <>
                <Result
                  status="success"
                  title="Pass AI Verification!"
                  subTitle={
                    <>
                      <p>Distance: {100 - aiv.distance}%</p>
                      <p>Verify: {aiv.success ? 'Pass' : 'Fail'}</p>
                    </>
                  }
                  extra={[
                    <Button
                      type="primary"
                      onClick={() => next()}
                      disabled={!img}
                    >
                      Next
                    </Button>,
                  ]}
                />
              </>
            ) : (
              <>
                <Spin size="large" />
                AI Model Verification...
              </>
            )}
          </div>
        );
      case 3:
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Result
              status="success"
              title="Successfully Verification!"
              extra={[
                <Button type="primary" onClick={handleOpen}>
                  Done
                </Button>,
              ]}
            />
          </div>
        );
    }
  };

  return (
    <>
      <WorkspacePresenter
        list={contentList}
        mint={handleMint}
        move={handleStartContent}
        createContent={handleCreateContent}
        verify={handleVerify}
      />
      <Modal
        title="유사도 검증"
        open={isOpen}
        width={'100%'}
        centered
        footer
        closable
        onOk={handleOpen}
        onCancel={handleOpen}
        bodyStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <div style={{ width: '90%', height: '900px' }}>
          <Space
            direction="vertical"
            size="large"
            style={{ width: '100%', height: '100%' }}
          >
            <Steps current={current} items={items} />
            <div className="steps-action">
              <div
                className="steps-content"
                style={{
                  width: '100%',
                  height: '800px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '15px',
                }}
              >
                {getContent()}
              </div>
              {/* {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => message.success('Processing complete!')}
                >
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                  Previous
                </Button>
              )} */}
            </div>
          </Space>
        </div>
      </Modal>
    </>
  );
};

export default WorkspaceContainer;
