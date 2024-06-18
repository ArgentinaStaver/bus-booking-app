import CarModel from "./CarModel";
import { CarResponseModel } from "./CarResponseModel";

const mapCarResponseToModel = (car: CarResponseModel): CarModel => {
  return ({
    id: car.id,
    make: car.make,
    model: car.model,
    plate: car.plate,
    chassisSeries: car.chassisSeries,
    seatsNumber: car.seatsNumber,
    seatsLayout: car.seatsLayout,
    company: {
      id: car.company.id,
      name: car.company.name,
    },
    active: car.active,
    createdAt: car.createdAt,
    updatedAt: car.updatedAt,
  });
};

export default mapCarResponseToModel;
