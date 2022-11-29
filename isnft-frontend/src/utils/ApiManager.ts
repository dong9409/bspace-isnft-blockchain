/**
 *
 *
 */

import axios from 'axios';
import { getCookie } from './';

export default class ApiManager {
  static instance: any;
  http: any;
  headers: any;
  /**
   *
   */
  constructor() {
    // 싱글톤 변수 할당
    if (!ApiManager.instance) {
      // Axios모듈
      this.http = axios.create();
      // 타임아웃 설정
      this.http.defaults.timeout = 30000;
      // 싱글톤 인스턴스
      ApiManager.instance = this;
    }
    return ApiManager.instance;
  }

  /**
   *
   */
  setHeaders = (headers = {}) => {
    this.headers = {
      ...this.headers,
      headers,
    };
  };

  /**
   *
   */
  getHeaders = () => {
    this.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/json',
      mode: 'no-cors',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${getCookie('isnft_token')}`,
    };
    return this.headers;
  };

  /**
   * NOTE Usualy Arrow function, return has same line.
   */
  get = (url: any, params = null) => this.getRequest(url, 'GET', params);
  delete = (url: any, params = null) =>
    this.deleteRequest(url, 'DELETE', params);
  post = (url: any, body: any = null, stringify = true) => {
    return this.postRequest(url, body, stringify, 'POST');
  };
  put = (url: any, body: any = null, stringify = true) => {
    return this.postRequest(url, body, stringify, 'PUT');
  };
  multipart = (url: any, body = null) => {
    return this.multipartRequest(url, body, 'POST');
  };

  /**
   * GET & DELETE
   */
  getRequest = async (url: any, method = 'GET', params: null | undefined) => {
    try {
      const headers = this.getHeaders();
      const queryString = this._jsonToQueryString(params);
      const response = await this.http.get(`${url}${queryString}`, {
        method,
        headers,
      });
      return response.data;
    } catch (error) {
      // console.log('error: ', error);
      return {
        code: 500,
        message: error,
      };
    }
  };

  /**
   * DELETE
   */
  deleteRequest = async (
    url: any,
    method = 'DELETE',
    params: null | undefined
  ) => {
    try {
      const headers = this.getHeaders();
      const queryString = this._jsonToQueryString(params);
      // const response = await fetch(`${url}${queryString}`, {
      const response = await this.http.delete(`${url}${queryString}`, {
        method,
        headers,
      });
      return response.data;
    } catch (error) {
      // console.log('error: ', error);
      return {
        code: 500,
        message: error,
      };
    }
  };

  /**
   * POST & PUT
   */
  postRequest = async (
    url: any,
    body: any = null,
    stringify = true,
    method = 'POST'
  ) => {
    try {
      const bodyData = body
        ? stringify
          ? JSON.stringify(body)
          : body
        : undefined;
      const headers = this.getHeaders();
      const response = await fetch(`${url}`, {
        method,
        headers,
        body: bodyData,
        //  ...(body && { body: bodyData }),
        // body: JSON.stringify(body)
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  };

  /**
   * Multipart File
   */
  multipartRequest = async (url: any, body = null, method = 'POST') => {
    try {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${getCookie('bicf_token')}`,
        },
      };
      const response = await this.http.post(url, body, config);
      return response.data;
      // const response = await fetch(`${url}`, {
      //   method,
      //   headers: {
      //     Accept: '*/*',
      //     'Cache-Control': 'no-cache',
      //     'Accept-Encoding': 'gzip, deflate',
      //     'cache-control': 'no-cache',
      //     'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      //     'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
      //     'content-type': 'multipart/form-data',
      //     // boundary: '----WebKitFormBoundaryIn312MOjBWdkffIM',
      //   },
      //   processData: false,
      //   contentType: false,
      //   mimeType: 'multipart/form-data',
      //   body: body,
      // });
      // //console.log(response);
      // const responseJson = await response.json();
      // //console.log("ERROR : ", responseJson);
      // return responseJson;
    } catch (error) {
      // console.log(error);
      return {
        code: 500,
        message: error,
      };
    }
  };

  /**
   * 쿼리스트링 파라미터 만들기
   * --
   */
  _jsonToQueryString = (params = null) => {
    // cno는 필수 파라미터 - 기본값
    let queryString = ``;
    // 파라미터가 있는경우
    if (params) {
      const keys = Object.keys(params);
      if (keys.length > 0) {
        for (let ii in keys) {
          queryString += `&${keys[ii]}=${params[keys[ii]]}`;
        }
        return `?${queryString.slice(1)}`;
      }
    }
    return ``;
  };
}
