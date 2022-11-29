import { JoinInfo, LoginInfo } from './../utils/SessionManager';
import axios from 'axios';
import ApiManager from '../utils/ApiManager';
import ApiConstant from './ApiConstant';
const http = new ApiManager();

const AuthApi = {
  /**
   * 회원가입
   * --
   * @param userInfo
   * @returns
   */
  signUpUser: async (userInfo: JoinInfo) => {
    try {
      const url: any = ApiConstant.SIGN_UP_USER;
      const { status, data } = await http.post(url, userInfo);
      if (status === 200) {
        return data;
      }
      throw data;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  /**
   * 로그인
   * --
   * @param userInfo
   * @returns
   */
  signInUser: async (userInfo: LoginInfo) => {
    try {
      const url: any = ApiConstant.SIGN_IN_USER;
      const { status, data } = await http.post(url, userInfo);
      if (status === 200) {
        return data;
      }
      throw data;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
};

export default AuthApi;
