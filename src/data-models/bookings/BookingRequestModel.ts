import { BookingOwnerType, PassengerType } from "../types/PassengerType";
import { Currency, PaymentType } from "../types/PricesTypes";

export interface BookingRequestModel {
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string;
  category: PassengerType;

  tripId: string;
  boardingId: string;
  unboardingId: string;
  seat: number;

  createdBy: BookingOwnerType;
  agentId: string | null;
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
    payment: {
      type: PaymentType | null;
    };
    boardingInfo?: {
      driverId: string;
      boarded: boolean;
      noShow: boolean;
    };
  };
}
