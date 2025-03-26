import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://tolvisuals-backend.vercel.app/api/v1",
});

export class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async get(params?: Record<string, any>, id?: number | null): Promise<T> {
    const url = id ? `${this.endpoint}/${id}` : this.endpoint;
    const response = await axiosInstance.get<T>(url, { params });
    return response.data;
  }

  async submitReview(data: T) {
    return await axiosInstance
      .post(this.endpoint, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  }
}
