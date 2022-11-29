import { JoinInfo, LoginInfo } from './../utils/SessionManager';
import axios from 'axios';
import ApiManager from '../utils/ApiManager';
import ApiConstant from './ApiConstant';
const http = new ApiManager();

const VerificationApi = {
  /**
   * verification
   * --
   * @param verificationInfo
   * @returns
   */
  verification: async (verificationInfo: any) => {
    try {
      const url: any = ApiConstant.VERIFICATION;
      const { status, data } = await axios.post(url, verificationInfo, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (status === 200) {
        return data.data;
      }
      throw data;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  /**
   * AI Verification
   * --
   * @param verificationInfo
   * @returns
   */
  aiVerification: async (verificationInfo: any) => {
    try {
      const url: any = ApiConstant.AI_VERIFICATION;
      const { status, data } = await axios.post(url, verificationInfo, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (status === 200) {
        return data.data;
      }
      throw data;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
};

export default VerificationApi;
