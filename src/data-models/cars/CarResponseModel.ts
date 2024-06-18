import { ResponseModel } from "../ResponseModel";
import CarModel from "./CarModel";

export interface CarResponseModel {
  id: string;
  make: string;
  model: string;
  plate: string;
  chassisSeries: string;
  seatsNumber: number;
  seatsLayout: any[];
  company: {
    id: string;
    name: string;
  };
  active: boolean;

  createdAt: string;
  updatedAt: string;
}

export default interface CarResponse extends ResponseModel {
  data?: CarModel;
}

export interface CarsResponse extends ResponseModel {
  data: CarModel[];
}
