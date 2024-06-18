import RouteModel, { FleetMap, RouteScheduleModel, RouteSettingsModel } from "./RouteModel";
import RouteStationModel from "./associated-stations/RouteStationModel";
import { ResponseModel } from "../ResponseModel";

export interface RouteResponseModel {
  id: string;
  name: string;
  settings: RouteSettingsModel;
  schedule: RouteScheduleModel;
  cars: FleetMap[];
  prices: any[];
  stations: RouteStationModel[];
  active: boolean;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: string;
  updatedAt: string;
}

export default interface RouteResponse extends ResponseModel {
  data?: RouteModel;
}

export interface RoutesResponse extends ResponseModel {
  data: RouteModel[];
}
