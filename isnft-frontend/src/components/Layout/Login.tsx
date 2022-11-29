// FIXME 동규 ->
import { Button, Divider } from 'antd';
import React, {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Web3 from 'web3';
import METAMASK from '../../assets/metamask-icon.png';
import { LoadingContext } from '../../utils';
import {
  JoinInfo,
  LoginInfo,
  SESSION,
  SessionContext,
  USER_TYPE,
} from '../../utils/SessionManager';
import './login.css';

type Props = {};

const Login = (props: Props) => {
  const { handleLoading, eventLoading } = useContext(LoadingContext);
  const { isLogin, handleLogin, handleJoin, handleSession } =
    useContext(SessionContext);
  const nmRef = useRef<HTMLDivElement>(null);
  /* Router */
  /* State */
  const initLoginText = '메타마스크로 로그인';
  const [loginText, setLoginText] = useState<string | null>(initLoginText);
  const initUserInfo = {
    user_id: '',
    user_nm: '',
    user_pw: '',
  };
  const [isJoin, setIsJoin] = useState(false);
  const [userInfo, setUserInfo] = useState(initUserInfo);
  /* Functions */
  /**
   * 메타마스크로 로그인 하기
   * --
   * @returns
   */
  const metamaskLogin = async () => {
    handleLoading(true);
    setTimeout(async () => {
      if (!window.ethereum) {
        alert('메타마스크 설치가 필요합니다.');
        console.log('메타마스크 설치가 필요합니다.');
        return;
      }
      window.web3 = window.web3 || {};
      window.web3 = new Web3(window.web3.currentProvider);
      try {
        await window.ethereum.enable();
        if (!window.ethereum.selectedAddress) {
          return;
        }

        const t = await onLogin(window.ethereum.selectedAddress);
        if (t) {
          handleSession(t);
          handleLoading(false);
          return;
        }

        const joinInfo: JoinInfo = {
          user_id: window.ethereum.selectedAddress,
          user_nm: window.ethereum.selectedAddress,
          user_type: USER_TYPE.METAMASK,
        };
        const rr: SESSION | Boolean = await handleJoin(joinInfo);
        if (rr) {
          const t = await onLogin(joinInfo.user_id);
          if (t) {
            handleSession(t);
          }
        }
        handleLoading(false);
        return 'success';
      } catch {
        return 'failed';
      }
    }, 3000);
  };

  const onLogin = async (user_id: string) => {
    const loginInfo: LoginInfo = {
      user_id,
      user_type: USER_TYPE.METAMASK,
    };
    const t: SESSION | Boolean = await handleLogin(loginInfo);
    return t;
  };

  /**
   * 유저 정보 핸들러
   * --
   * @param e
   */
  const handleUserInfo = (e: { target: { name: any; value: any } }) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleIsJoin = () => {
    setIsJoin(!isJoin);
  };

  /**
   * 이메일로 로그인
   * --
   * @param e
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isJoin) {
      eventLoading(async () => {
        const joinInfo: JoinInfo = {
          ...userInfo,
          user_type: USER_TYPE.EMAIL,
        };
        const t = await handleJoin(joinInfo);
        if (t) {
          handleJoin();
          handleLoading(false);
          return true;
        }
      });
    }
    eventLoading(async () => {
      const loginInfo: LoginInfo = {
        user_id: userInfo.user_id,
        user_pw: userInfo.user_pw,
        user_type: USER_TYPE.EMAIL,
      };
      const t = await handleLogin(loginInfo);
      if (t) {
        handleSession(t);
        setUserInfo(initUserInfo);
        handleLoading(false);
        return true;
      }
    });
  };
  /* Hooks */
  useEffect(() => {
    if (!nmRef.current) {
      return;
    }
    if (isJoin) {
      nmRef.current.style.height = '30px';
      nmRef.current.style.borderBottom = '1px solid lightgray';
    } else {
      nmRef.current.style.height = '0px';
      nmRef.current.style.borderBottom = 'none';
    }
  }, [isJoin]);

  /* Render */
  return (
    <div className="login-container">
      <div className="email-login">
        <div className="title">Email로 로그인</div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input">
            <input
              type="text"
              placeholder="E-Mail"
              onChange={handleUserInfo}
              name="user_id"
            />
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Password"
              name="user_pw"
              onChange={handleUserInfo}
            />
          </div>
          <div className="input" ref={nmRef}>
            <input
              type="password"
              placeholder="필명"
              name="user_nm"
              onChange={handleUserInfo}
            />
          </div>
          <Button size="large" htmlType="submit" className="btn" shape="round">
            {isJoin ? '회원가입' : '로그인'}
          </Button>
          <Button type="link" className="join-btn" onClick={handleIsJoin}>
            {isJoin ? '로그인하기' : '회원가입하기'}
          </Button>
        </form>
      </div>
      <div className="sns-list"></div>
    </div>
  );
};

export default Login;
