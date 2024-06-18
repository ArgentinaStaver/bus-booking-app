import { ResponseModel } from "../ResponseModel";
import { BookingOwnerType, PassengerType } from "../types/PassengerType";
import { Currency } from "../types/PricesTypes";
import { BookingModel } from "./bookingModel";

export interface BookingResponseModel {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string;
  category: PassengerType;

  routeName: string;
  tripDate: string;
  tripId: string;
  boarding: {
    id: string;
    name: string;
    iataCode: string;
    type: string;
    location: {
      id: string;
      name: string;
    };
  };
  unboarding: {
    id: string;
    name: string;
    iataCode: string;
    type: string;
    location: {
      id: string;
      name: string;
    };
  };
  seat: number;

  createdBy: BookingOwnerType;
  agent: {
    id: string;
    firstname: string;
    lastname: string;
  };
  passengerId: string | null;

  price: string;
  discount: string;
  currency: Currency;
  paymentCompleted: boolean;

  meta: {
    notes?: string;
  };

  createdAt: string;
  updatedAt: string;
}

export default interface BookingResponse extends ResponseModel {
  data?: BookingModel;
}
