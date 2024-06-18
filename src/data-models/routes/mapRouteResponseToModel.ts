import RouteModel from "./RouteModel";
import { RouteResponseModel } from "./RouteResponseModel";
import { mapRouteStationResponseToModel } from "./associated-stations/mapRouteStationResponseToModel";

export const mapRouteResponseToModel = (
  route: RouteResponseModel
): RouteModel => ({
  ...route,
  stations: route.stations.map(mapRouteStationResponseToModel),
  settings: {
    ...route.settings,
    enableBeforeDeparture: 180,
    // enableBeforeDeparture: route.settings?.enableBeforeDeparture || 180,
  },
});
