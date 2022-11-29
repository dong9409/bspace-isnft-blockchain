import { Button, Space, Typography } from 'antd';
import html2canvas from 'html2canvas';
import React, { useLayoutEffect, useRef, useState } from 'react';
import LOGO from '../../../assets/logo512.png';
import fs from 'fs';
type Props = {
  content_id: string;
  move: Function;
  content: any;
  mint: Function;
  verify: Function;
};

const { Title, Paragraph } = Typography;

const ListItem = (props: Props) => {
  const canvasRef = useRef<any>();
  /* Router */
  /* State */
  const { content_id, move, content, mint, verify } = props;
  const {
    content_title,
    content_desc,
    event_list,
    content_width,
    content_height,
    isNFT,
    isVerify,
  } = content;
  const [img, setImg] = useState<any>();
  /* Functions */
  const handleMove = () => {
    move(content_id);
  };

  const handleMint = () => {
    const postData = {
      ...content,
      thumbnail: img,
    };
    mint(postData);
  };

  const handleVerify = () => {
    verify(content_id);
  };
  const createThumbnail = async (d: any) => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.width = content_width;
    canvas.height = content_height;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    // const path = JSON.parse(d);
    const path = d;
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

  const handleJson = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(content)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = `${content_id}_${content_title}.json`;

    link.click();
  };

  /* Hooks */
  useLayoutEffect(() => {
    if (event_list) {
      createThumbnail(event_list);
    }
  }, []);
  /* Render */
  return (
    <div className="item-container">
      <div className="thumbnail">
        {img ? (
          <img src={img} alt="thumbnail" />
        ) : (
          <img src={LOGO} alt="logo" />
        )}
      </div>
      <div className="content">
        <Typography>
          <Title>{content_title}</Title>
          <Paragraph>{content_desc}</Paragraph>
        </Typography>
        <Space className="bnt-list">
          <Button onClick={handleMove}>수정하기</Button>
          <Button disabled={isNFT} onClick={handleMint}>
            발급하기
          </Button>
          {isNFT && <Button onClick={handleJson}>메타데이터 내려받기</Button>}
          <Button disabled={isVerify} onClick={handleVerify}>
            검증하기
          </Button>
          {/* <Button>다운받기</Button> */}
        </Space>
      </div>
      <canvas className="ddcanvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default ListItem;
