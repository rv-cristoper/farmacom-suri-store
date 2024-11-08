import { IProduct } from "../models/api/product";
import ProductService from "../services/product-service";

export default class ProductController {
  static get = async ({
    setProducts,
    setLoading,
  }: {
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    try {
      setLoading(true);
      const response = await ProductService.get();
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  static create = async ({
    data,
    getProducts,
  }: {
    data: Record<string, string | number>;
    getProducts: () => void;
  }) => {
    try {
      await ProductService.create(data);
      getProducts();
    } catch (err) {
      console.error(err);
    }
  };
}
