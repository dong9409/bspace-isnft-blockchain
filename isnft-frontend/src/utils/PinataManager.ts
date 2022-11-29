import axios from 'axios';
import { API_KEY, API_SECRET } from '.';

export interface IPFSFile {
  file_name: String;
  file_object: File | Blob;
  metadata: String;
}

export interface Attributes {
  metaDataHash?: string;
}
export interface IPFSJson {
  name?: string;
  image?: string;
  description?: string;
  attributes?: Attributes[];
}

export class PinataManager {
  private static instance: PinataManager;
  constructor() {
    if (PinataManager.instance) {
      PinataManager.instance = this;
    }
    return PinataManager.instance;
  }

  /**
   * 피나타 업로드
   * --
   * @param f_info
   * @returns
   */
  async sendFileToIPFS(f_info: IPFSFile) {
    try {
      const { file_object } = f_info;
      const formData = new FormData();
      formData.append('file', file_object);

      const resFile = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data: formData,
        headers: {
          pinata_api_key: `${API_KEY}`,
          pinata_secret_api_key: `${API_SECRET}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      //   console.log(resFile);
      const { status, data, statusText } = resFile;
      if (status !== 200) {
        throw statusText;
      }

      //   const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
      //   console.log(ImgHash);
      return data;
      //Take a look at your Pinata Pinned section, you will see a new file added to you list.
    } catch (error) {
      console.log('Error sending File to IPFS: ');
      console.log(error);
      return false;
    }
  }
  async pinJSONToIPFS(JSONBody: IPFSJson) {
    //making axios POST request to Pinata ⬇️
    try {
      const resFile = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        data: JSONBody,
        headers: {
          pinata_api_key: `${API_KEY}`,
          pinata_secret_api_key: `${API_SECRET}`,
        },
      });
      const { status, data, statusText } = resFile;
      if (status !== 200) {
        throw statusText;
      }
      return data;
    } catch (error) {
      console.log('Error sending JSON to IPFS: ');
      console.log(error);
      return error;
    }
  }
}
