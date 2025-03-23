import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://tolvisuals-backend.vercel.app/api/v1",
});

export class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async get(): Promise<T> {
    const response = await axiosInstance.get<T>(this.endpoint);
    return response.data;
  }
}
