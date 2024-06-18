import { FleetMap, RouteScheduleModel, RouteSettingsModel } from "./RouteModel";

export interface RouteRequestModel {
  id?: string;
  name?: string;
  settings?: RouteSettingsModel;
  schedule?: RouteScheduleModel;
  cars?: FleetMap[];
  active?: boolean;
}

export interface RouteRequestQueryModel {
  applyFrom?: Date;
}

export default RouteRequestModel;
