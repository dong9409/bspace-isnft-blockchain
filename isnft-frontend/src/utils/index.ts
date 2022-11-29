export const API_KEY = import.meta.env.VITE_PINATA_API_KEY;
export const API_SECRET = import.meta.env.VITE_PINATA_API_SECRET;
export const JWT = import.meta.env.VITE_PINATA_JWT;
export const WEB3_URL = import.meta.env.VITE_WEB3_URL;
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const SESSION_URL = import.meta.env.VITE_SESSION_URL;
export const AI_URL = import.meta.env.VITE_AI_URL;

export * from './PinataManager';
export * from './LoadingManager';

/**
 * 쿠키 가져오기
 * --
 * @param {String} name 쿠키명
 * @param {Object} options
 * @returns
 */
export const getCookie = (name: any, options = null) => {
  const value = window.document.cookie.match(
    '(^|;) ?' + name + '=([^;]*)(;|$)'
  );
  return value ? value[2] : null;
};

/**
 * 쿠키 저장하기
 * --
 * @param {String} name 저장할 쿠키명
 * @param {String} value 저장할 쿠키 내용
 * @param {Number} expires 저장할 기간(일)
 * @param {Function} callback 콜백함수
 */
export const setCookie = (
  name: any,
  value: any,
  expires: number | undefined = 1,
  callback?: Function | undefined
) => {
  var date = new Date();
  date.setTime(date.getTime() + expires * 1000 * 60 * 60 * 24);
  window.document.cookie = `${name}=${value};expires=${date.toUTCString()}; path=/`;
  if (callback) callback();
};

/**
 * 쿠키 삭제
 * --
 * @param {String} name 쿠키명
 * @param {Object} param1 쿠키 주소, 도메인
 */
export const deleteCookie = (name: any, domain: any) => {
  if (getCookie(name)) {
    window.document.cookie =
      name +
      '=' +
      ';path=/' +
      (domain ? ';domain=' + domain : '') +
      ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }
};

export const getToken = (): string | boolean => {
  const token = getCookie('ISGuard_token');
  if (token) {
    return `Bearer ${token}`;
  }
  return false;
};
