import { ResponseModel } from "../data-models/ResponseModel";
import { BookingRequestModel } from "../data-models/bookings/BookingRequestModel";
import BookingResponse from "../data-models/bookings/BookingResponseModel";
import mapBookingResponseToModel from "../data-models/bookings/mapBookingResponseToModel";
import http from "../services/httpWrappers";
import { REACT_APP_API_BASE_URL } from "../utils/constants";

const baseUrl = REACT_APP_API_BASE_URL;

export const createBooking = async (bookingData: BookingRequestModel[]): Promise<BookingResponse> => {
  try {
    const { status } = await http.post(`${baseUrl}/bookings`, bookingData);

    return { status };
  } catch (error) {
    return { status: (error as any).response.status, data: (error as any).response.data }
  }
}

export const updateBooking = async (
  id: string,
  bookingData: Partial<BookingRequestModel>
): Promise<BookingResponse> => {
  try {
    const { data, status } = await http.put(
      `${baseUrl}/bookings/${id}`,
      bookingData
    );

    return {
      status,
      data: mapBookingResponseToModel(data),
    };
  } catch (error) {
    return { status: (error as any).response.status };
  }
};
