import RouteStationModel from "./associated-stations/RouteStationModel";

export type WeekDays = "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU";
export type TransportClass = "international" | "national";
export type RouteScheduleType = "pattern" | "weekly";

export interface RouteSettingsModel {
  paymentCompletionDuration: number; // minutes to allow the user to complete the payment online. The seats are blocked.
  preSales: number; // days
  lockSales: number; // minutes before car departing from initial point
  lockTransitSales: number; // minutes before car departing from transit point
  maxBookingSeats: number;
  transportClass: TransportClass;
  canPayInTheBus: boolean;
  enableBeforeDeparture: number; // min
}

export interface RouteScheduleModel {
  type: RouteScheduleType;
  startDate: Date | string;
  endDate: Date | string | null;
  weekDays?: WeekDays[]; // For type: 'weekly'
  dayStep?: number | null; // For type: 'pattern' -> 1 = daily; 2 = every second day
}

export type FleetMap = [number | string, { carId: string; driverId: string }];

export interface RouteModel {
  id: string;
  name: string;
  settings: RouteSettingsModel;
  schedule: RouteScheduleModel;
  cars: FleetMap[];
  // prices: PriceModel[];
  // discounts: DiscountModel | null;
  stations: RouteStationModel[];
  active: boolean;
  status: "DRAFT" | "PUBLISHED";
  createdAt: string;
  updatedAt: string;
}

export default RouteModel;
