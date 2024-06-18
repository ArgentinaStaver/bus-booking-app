import { PassengerType, BookingOwnerType } from "../types/PassengerType";
import { Currency, PaymentType } from "../types/PricesTypes";

export interface StationModel {
  id: string;
  name: string;
  iataCode: string;
  type: string;
  location: {
    id: string;
    name: string;
  };
}

export interface BookingModel {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string | null;
  phone: string;
  category: PassengerType;

  routeName: string;
  tripDate: Date;
  tripId: string;
  boarding: StationModel;
  unboarding: StationModel;
  seat: number;

  createdBy: BookingOwnerType;
  agent: {
    id: string;
    fullName: string;
  };
  passengerId: string | null;

  price: number;
  discount: number;
  currency: Currency;
  paymentCompleted: boolean;
  deleted: boolean;
  meta: {
    notes?: string;
    infant?: string;
    flightInfo?: any;
    sellerCompany?: string | null;
    beneficiaryCompany?: string | null;
    paymentType?: PaymentType | null;
    boardingInfo?: {
      driverId: string;
      boarded: boolean;
      noShow: boolean;
    };
  };

  createdAt: string;
  updatedAt: string;
}
