import axios from "../lib/axios-instance";
import { BaseResponse } from "../models/api/base";
import { IProduct } from "../models/api/product";

export default class ProductService {
  static get = async () => {
    const response = await axios.request<BaseResponse<IProduct[]>>({
      method: "GET",
      url: "/api/v1/product",
    });
    return response.data;
  };

  static create = async (data: Record<string, string | number>) => {
    const response = await axios.request<{ message: string }>({
      method: "POST",
      url: "/api/v1/product",
      data,
    });
    return response.data;
  };
}
