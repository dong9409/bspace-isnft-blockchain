import React, { useContext, useState } from 'react';
import { Avatar, Drawer } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import './layout.css';
import LOGO from '../../assets/logo512.png';
import Login from './Login';
import User from './User';
import { SessionContext } from '../../utils/SessionManager';

type Props = {};

const IndexLayout = (props: Props) => {
  const { isLogin, userInfo } = useContext(SessionContext);
  /* Router */
  const navigation = useNavigate();
  /* State */
  const [isOpen, setIsOpen] = useState(false);

  /* Functions */
  /**
   * 홈 화면으로 이동
   * --
   */
  const handleHome = () => {
    navigation('/');
  };

  const handleLogin = () => {
    setIsOpen(false);
  };

  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

  /* Hooks */
  /* Render */
  return (
    <div className="layout-container">
      <div className="layout-header">
        <div className="logo-wrapper" onClick={handleHome}>
          <img
            src={LOGO}
            alt="logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        <div className="metasheet">
          <div className="user-profile">
            <div className="login-btn" onClick={handleDrawer}>
              {isLogin ? userInfo.user_nm : '로그인'}
            </div>
          </div>
        </div>
      </div>
      <div className="layout-content">
        <Outlet />
      </div>
      <Drawer
        title={isLogin ? 'MyInfo' : '로그인'}
        onClose={handleDrawer}
        open={isOpen}
        width={600}
      >
        {isLogin ? <User /> : <Login />}
      </Drawer>
    </div>
  );
};

export default IndexLayout;
