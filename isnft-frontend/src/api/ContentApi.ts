import axios from 'axios';
import ApiManager from '../utils/ApiManager';
import ApiConstant from './ApiConstant';
const http = new ApiManager();

const ContentApi = {
  /**
   * 컨텐츠 등록
   * --
   * @param contentInfo
   * @returns
   */
  createContent: async (contentInfo: any) => {
    try {
      const url: any = ApiConstant.CREATE_CONTENT;
      const { status, data } = await http.post(url, contentInfo);
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
   * 창작자별 컨텐츠 조회
   * --
   * @param user_id
   * @returns
   */
  getContentByUser: async (user_id: string) => {
    try {
      const url: any = ApiConstant.GET_CONTENT_BY_USER.replace(
        ':user_id',
        user_id
      );
      const { status, data } = await http.get(url);
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
   * 컨텐츠 수정
   * --
   * @param content
   * @returns
   */
  updateContent: async (content: any) => {
    try {
      const url: any = ApiConstant.UPDATE_CONTENT;
      const { status, data } = await http.put(url, content);
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

export default ContentApi;
