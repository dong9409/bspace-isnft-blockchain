import React, { createContext, useEffect, useState } from 'react';
import { deleteCookie, getCookie, SESSION_URL, setCookie } from '.';
import AuthApi from '../api/AuthApi';

const SessionContext = createContext<any>(null);

export { SessionContext };

export enum USER_TYPE {
  EMAIL = 'EMAIL',
  METAMASK = 'METAMASK',
}

export interface JoinInfo {
  user_id: string;
  user_pw?: string;
  user_nm: string;
  user_type: USER_TYPE;
}

export interface LoginInfo {
  user_id: string;
  user_pw?: string;
  user_type: USER_TYPE;
}

type Props = {
  children: React.ReactNode;
};

export interface SESSION {
  user_id: string;
  user_nm: string;
  user_type: USER_TYPE;
  created_at: Date;
  modified_at: Date;
  access_token?: string;
}

const SessionManager = (props: Props) => {
  /* Router */
  /* State */
  const { children } = props;
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<SESSION | undefined>();
  const [content, setContent] = useState<any>([]);
  /* Functions */
  /**
   * 세션 등록
   * --
   * @param session
   */
  const handleSession = (session: SESSION) => {
    const { access_token, ...sessionInfo } = session;
    setCookie('isnft_token', access_token);
    setCookie('isnft_user', JSON.stringify(sessionInfo));
    setUserInfo(sessionInfo);
    setIsLogin(true);
  };
  /**
   * 세션 체크
   * --
   * @returns
   */
  const checkSession = () => {
    const token = getCookie('isnft_token');
    if (!token) {
      return false;
    }

    const _sess = getCookie('isnft_user');
    if (!_sess) {
      return false;
    }
    const sess = JSON.parse(_sess);
    console.log(sess);
    setUserInfo(sess);
    setIsLogin(true);
    return true;
  };

  /**
   * 회원가입 요청
   * --
   * @param joinInfo
   * @returns
   */
  const handleJoin = async (joinInfo: JoinInfo) => {
    const result = await AuthApi.signUpUser(joinInfo);
    const result1 = await AuthApi.signUpBlockchain(joinInfo);
    if (result) {
      return result;
    }
    return false;
  };

  /**
   * 로그인 요청
   * --
   * @param loginInfo
   * @returns
   */
  const handleLogin = async (loginInfo: LoginInfo) => {
    const result = await AuthApi.signInUser(loginInfo);
    const result1 = await AuthApi.signInUserBlockchain(loginInfo);
    if (result) {
      return result;
    }
    return false;
  };

  /**
   * 로그아웃 처리
   * --
   */
  const handleLogout = () => {
    deleteCookie('isnft_token', SESSION_URL);
    deleteCookie('isnft_user', SESSION_URL);
    setIsLogin(false);
    setUserInfo(undefined);
  };

  /* Hooks */
  useEffect(() => {
    if (userInfo) return;
    checkSession();
  }, [userInfo]);

  /* Render */
  return (
    <SessionContext.Provider
      value={{
        userInfo,
        isLogin,
        checkSession,
        handleLogin,
        handleJoin,
        handleSession,
        handleLogout,
        content,
        setContent,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionManager;
