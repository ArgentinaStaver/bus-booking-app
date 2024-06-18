import { StationActionType } from "../../types/TripTypes";

export interface RouteStationRequestModel {
  routeId: string;
  stationId: string;
  arrival: string;
  departure: string;
  days: number;
  sequence: number;
  action: StationActionType;
  active: boolean;
}

export default RouteStationRequestModel;
