/* eslint-disable no-useless-catch */
import HttpClient from '../../utils/http-client';


export default class AuthService {
  constructor() {
    this.httpClient = new HttpClient();
  }

  async login(payload) {
    const { email, password } = payload;
    const dummyResponse = { auth: "success" };
    try {
      return dummyResponse;
      const response = await this.httpClient.post(
        `base_url/v1/auth/login`,
        { email, password },
      );

      return response?.data;
    } catch(err) {
      throw err;
    }
  }

  async getAWSConfig(payload) {
    const { email, password } = payload;
    const dummyResponse = { accessKeyId: "", secretAccessKey: "", region: "us-east-2" };
    try {
      return dummyResponse;
      const response = await this.httpClient.post(
        `base_url/v1/auth/login`,
        { email, password },
      );

      return response?.data;
    } catch(err) {
      throw err;
    }
  }

}
