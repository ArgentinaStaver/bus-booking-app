import { addDays, format } from "date-fns";
import mapBookingResponseToModel from "../bookings/mapBookingResponseToModel";
import { mapRouteResponseToModel } from "../routes/mapRouteResponseToModel";
import TripModel from "./TripModel";
import { TripResponseModel } from "./TripResponseModel";
import RouteModel from "../routes/RouteModel";
import RouteStationModel from "../routes/associated-stations/RouteStationModel";

const getDepartureStation = (route: RouteModel): RouteStationModel|undefined => {
  return route.stations.find((station) => station.settings.sequence === 1);
}

const getArrivalStation = (route: RouteModel): RouteStationModel|undefined => {
  return route.stations.reduce((acc, station) => {
    if (!acc) acc = station;
    else if (acc.settings.sequence < station.settings.sequence) {
      acc = station;
    }

    return acc;
  }, undefined as RouteStationModel|undefined);
}

const getDepartureDateTime = (trip: TripResponseModel): Date => {
  return new Date(`${format(new Date(trip.date), 'yyyy-MM-dd')} ${getDepartureStation(trip.route)!.settings.departure}`);
}

const getArrivalDateTime = (trip: TripResponseModel): Date => {
  return new Date(
    `${format(addDays(new Date(trip.date), getArrivalStation(trip.route)!.settings.days), 'yyyy-MM-dd')} ${getArrivalStation(trip.route)!.settings.arrival}`
  );
}

export const mapTripResponseToModel = (trip: TripResponseModel): TripModel => ({
    ...trip,
    bookings: trip.bookings.map(mapBookingResponseToModel),
    cars: new Map(trip.cars).get(1)!,
    prices: new Map(trip.prices),
    date: new Date(trip.date),
    departure: new Date(trip.departure),
    arrival: new Date(trip.arrival),
    departureDateTime: getDepartureDateTime(trip),
    arrivalDateTime: getArrivalDateTime(trip),
    route: mapRouteResponseToModel(trip.route),
    isLive: trip.isLive,
  });
