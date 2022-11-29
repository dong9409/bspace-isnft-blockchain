import React, { useContext, useState } from 'react';
import { Button, Divider, Modal, Result } from 'antd';
import ListItem from './ListItem';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Content } from './WorkspaceContainer';
import { LoadingContext } from '../../../utils';
import './workspace.css';

type Props = {
  list: Array<Content>;
  createContent: Function;
  mint: Function;
  move: Function;
  verify: Function;
};

const WorkspacePresenter = (props: Props) => {
  /* Router */
  /* State */
  const { list, mint, createContent, move, verify } = props;
  const [isOpen, setIsOpen] = useState(false);
  const initContent = {
    content_title: '',
    content_desc: '',
  };
  const [contentInfo, setContentInfo] = useState(initContent);
  /* Functions */
  /**
   * 모달 제어
   * --
   */
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleContent = (e: { target: { name: any; value: any } }) => {
    setContentInfo({ ...contentInfo, [e.target.name]: e.target.value });
  };

  const handleOk = async () => {
    const result = await createContent(contentInfo);
    if (result) {
      setContentInfo(initContent);
      handleOpen();
      return true;
    }
    return false;
  };

  const handleCancel = () => {
    // Do Cancel Modal
    setContentInfo(initContent);
    handleOpen();
  };

  const handleVerify = () => {
    verify();
  };

  /* Hooks */
  /* Render */
  const listRender = list.map((item: Content) => {
    const { content_id } = item;
    return (
      <ListItem
        key={content_id}
        content_id={content_id}
        move={move}
        content={item}
        mint={mint}
        verify={handleVerify}
      />
    );
  });

  return (
    <div className="workspace-container">
      <h1>MyContents</h1>
      <Divider />
      {list.length !== 0 && (
        <div className="add-btn" onClick={handleOpen}>
          <div className="add-icon">
            <PlusCircleOutlined style={{ fontSize: '5rem' }} />
          </div>

          <div className="add-text">Create Masterpiece</div>
        </div>
      )}
      <div className="list-container">
        {listRender}
        {list.length === 0 && (
          <Result
            status="404"
            title="Oops... still nothing..."
            // subTitle=""
            extra={
              <Button
                type="primary"
                shape="round"
                size="large"
                onClick={handleOpen}
              >
                Start Masterpiece
              </Button>
            }
          />
        )}
      </div>
      <Modal
        title="Create Content"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={'40%'}
        centered
        cancelText="취소"
        okText="추가하기"
      >
        <div className="content-form">
          <div className="input">
            <input
              type="text"
              placeholder="Cotnent Title"
              onChange={handleContent}
              name="content_title"
              value={contentInfo.content_title}
            />
          </div>
          <div className="input">
            <textarea
              placeholder="Content Description"
              name="content_desc"
              rows={10}
              cols={10}
              onChange={handleContent}
              value={contentInfo.content_desc}
            />
          </div>
        </div>
      </Modal>

      <Divider />

      {/* <ListItem /> */}
    </div>
  );
};

WorkspacePresenter.defaultProps = {
  list: [],
};

export default WorkspacePresenter;
