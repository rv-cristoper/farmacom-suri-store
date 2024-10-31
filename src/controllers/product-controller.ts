import { IProduct } from "../models/api/product";
import ProductService from "../services/product-service";

export default class ProductController {
  static get = async ({
    setProducts,
  }: {
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  }) => {
    try {
      const response = await ProductService.get();
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
}
