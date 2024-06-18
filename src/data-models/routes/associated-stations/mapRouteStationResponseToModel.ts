import RouteStationModel from "./RouteStationModel";
import { RouteStationResponseModel } from "./RouteStationResponseModel";


export const mapRouteStationResponseToModel = (assoc: RouteStationResponseModel): RouteStationModel => ({
  ...assoc,
});
