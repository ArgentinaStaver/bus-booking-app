import { ResponseModel } from "../ResponseModel";
import { BookingResponseModel } from "../bookings/BookingResponseModel";
import TripModel from "./TripModel";

type TripFleetMap = [number, { carId: string; drivers: string[] }][]; // [ 1, { carId: 1, drivers: [1, 2] } ]
type TripPriceMap = [string, { price: number }][]; // intersection of two IDs: [ 'startLocationId-endLocationId', 25 ]
type TripStationsMap = [string, { active: boolean }][];

export interface TripResponseModel {
  id: string;
  routeId: string;
  date: string;
  departure: string;
  arrival: string;
  route: any;
  cars: TripFleetMap; // Overrides the default settings of Cars and Drivers
  prices: TripPriceMap | null; // Overrides the default settings of Prices and Discounts for a segment
  stations: TripStationsMap | null; // Overrides the default settings of a station
  bookings: BookingResponseModel[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
  isLive: boolean;
}

export interface TripsResponse extends ResponseModel {
  data: TripModel[];
}

export default interface TripResponse extends ResponseModel {
  data?: TripModel;
}
