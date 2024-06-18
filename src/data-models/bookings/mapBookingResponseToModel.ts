
import { BookingResponseModel } from "./BookingResponseModel";
import { BookingModel } from "./bookingModel";

const mapBookingResponseToModel = (booking: BookingResponseModel): BookingModel => ({
  ...booking,
  fullName: `${booking.firstName} ${booking.lastName}`,
  tripDate: new Date(booking.tripDate),
  price: parseFloat(booking.price),
  discount: parseFloat(booking.discount),
  agent: {
    id: booking.agent?.id,
    fullName: booking.agent ? `${booking.agent.firstname} ${booking.agent.lastname}` : '',
  },
});

export default mapBookingResponseToModel;
