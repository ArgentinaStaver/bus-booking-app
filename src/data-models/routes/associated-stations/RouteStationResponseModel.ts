import { ResponseModel } from "../../ResponseModel";
import { StationActionType, StationType } from "../../types/TripTypes";
import RouteStationModel from "./RouteStationModel";

export interface RouteStationResponseModel {
  id: string;
  name: string,
  address: string,
  type: StationType,
  description: string,
  location: {
    id: string,
    name: string
  },
  settings: {
    id: string,
    arrival: string,
    departure: string,
    days: number,
    sequence: number,
    action: StationActionType,
    active: boolean
  }
}

export default interface RouteStationResponse extends ResponseModel {
  data?: RouteStationModel;
}

export interface RouteStationsResponse extends ResponseModel {
  data: RouteStationModel[];
}
