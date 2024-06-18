import { BookingModel } from "../bookings/bookingModel";
import RouteModel from "../routes/RouteModel";

interface TripModel {
  id: string;
  routeId: string;
  date: Date;
  departure: Date;
  arrival: Date;
  departureDateTime: Date;
  arrivalDateTime: Date;
  route: RouteModel;
  bookings: BookingModel[];
  cars: { carId: string; drivers: string[] };
  prices: Map<string, { price: number }>;
  active: boolean;
  isLive: boolean;
}

export default TripModel;
