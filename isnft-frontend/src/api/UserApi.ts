import axios from 'axios';
import ApiConstant from './ApiConstant';

const Api = {
  /**
   * 사용자 로그인 요청
   * -
   * @param {Object} userInfo
   * @returns
   */
  signinUser: async (userInfo: any) => {
    try {
      const url: any = ApiConstant.SIGN_IN_ADMIN;
      const { status, data } = await axios.post(url, userInfo);
      console.log(status, data);
      if (status === 200) {
        return data.data;
      }
      throw data;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  //   /**
  //    * 관리자 로그인 요청
  //    * -
  //    * @param {Object} userInfo
  //    * @returns
  //    */
  //   signInAdmin: async (userInfo: any) => {
  //     try {
  //       const url: any = ApiConstant.SIGN_IN_ADMIN;
  //       const { status, data } = await axios.post(url, userInfo);
  //       console.log(status, data);
  //       if (status === 200) {
  //         return data.data;
  //       }
  //       throw data;
  //     } catch (e) {
  //       console.error(e);
  //       return false;
  //     }
  //   },
};

export default Api;
