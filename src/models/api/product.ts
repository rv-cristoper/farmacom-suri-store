import { BaseEntity } from "./base";

interface IStock extends BaseEntity {
  productId: string;
  stock: number;
  expirationDate: Date;
}

export interface IProduct extends BaseEntity {
  name: string;
  description: string;
  location: string;
  photo: string[];
  isActive: true;
  unitOfMeasurement: string;
  units: number;
  packageOrBox: number;
  blisters: number;
  stocks: IStock[];
}
