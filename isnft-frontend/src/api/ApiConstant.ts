import { BASE_URL, AI_URL } from './../utils/index';
const AuthConstant = {
  /**
   * @method POST
   * @param
   */
  SIGN_UP_USER: `${BASE_URL}/auth/signup`,
  /**
   * @method POST
   * @param
   */
  SIGN_IN_USER: `${BASE_URL}/auth/signin`,
};

const UserConstant = {};

const ContentConstant = {
  /**
   * @method POST
   * @param
   */
  CREATE_CONTENT: `${BASE_URL}/content`,

  /**
   * @method GET
   * @param
   */
  GET_CONTENT_BY_USER: `${BASE_URL}/content/user/:user_id`,

  /**
   * @method PUT
   * @param
   */
  UPDATE_CONTENT: `${BASE_URL}/content`,
};

const VerificationConstant = {
  /**
   * @method POST
   * @param
   */
  VERIFICATION: `${BASE_URL}/verification`,
  AI_VERIFICATION: `${AI_URL}/check_plagiarism/`,
};
const ApiConstant = {
  ...AuthConstant,
  ...UserConstant,
  ...ContentConstant,
  ...VerificationConstant,
};

export default ApiConstant;
