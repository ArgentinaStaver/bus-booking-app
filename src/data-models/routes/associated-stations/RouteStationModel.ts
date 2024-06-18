import { StationActionType, StationType } from "../../types/TripTypes";

export interface RouteStationModel {
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

export default RouteStationModel;
