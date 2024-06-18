import http from "../services/httpWrappers";
import { format } from "date-fns";
import { REACT_APP_API_BASE_URL } from "../utils/constants";
import TripResponse, {
  TripsResponse,
} from "../data-models/trip/TripResponseModel";
import { mapTripResponseToModel } from "../data-models/trip/mapTripResponseToModel";

const baseUrl = REACT_APP_API_BASE_URL;

interface FetchTripFilters {
  date: Date;
}

export const fetchTrips = async ({
  date,
}: FetchTripFilters): Promise<TripsResponse> => {
  try {
    const { data, status } = await http.get(`${baseUrl}/trips`, {
      params: {
        date: format(date, "yyyy-MM-dd"),
      },
    });

    return { data: data.map(mapTripResponseToModel), status };
  } catch (error) {
    return { data: [], status: (error as any).response.status };
  }
};

export const fetchTripById = async (id: string): Promise<TripResponse> => {
  try {
    const { data, status } = await http.get(`${baseUrl}/trips/${id}`);

    return { data: mapTripResponseToModel(data), status };
  } catch (error) {
    return { status: (error as any).response.status };
  }
};
