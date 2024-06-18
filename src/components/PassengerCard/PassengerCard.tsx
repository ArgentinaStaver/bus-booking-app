import {
  IonItem,
  IonNote,
  IonLabel,
  IonIcon,
  IonFab,
  IonFabButton,
  IonText,
  IonBadge,
} from "@ionic/react";
import { call } from 'ionicons/icons';
import { BookingModel } from "../../data-models/bookings/bookingModel";
import './PassengerCard.css';

interface PassengerCardDetails {
  booking: BookingModel;
  openModal: () => void;
}

const PassengerCard: React.FC<PassengerCardDetails> = ({ booking, openModal }) => {
  const getBookingStatusColor = (booking: BookingModel) => {
    const { paymentCompleted, meta } = booking;

    if (meta.boardingInfo?.boarded && paymentCompleted) return 'success';
    else if (meta.boardingInfo?.noShow) return 'danger';
    else if (paymentCompleted) return 'completed';
    else return 'medium';
  }

  const getBookingStatusText = (booking: BookingModel) => {
    const { paymentCompleted, meta, price, currency } = booking;

    if (paymentCompleted) return 'Achitat';
    else if (meta.boardingInfo?.noShow) return 'Neprezentat';
    else if (paymentCompleted) return 'completed';
    else return `${price} ${currency}`;
  }

  return (
    <IonItem
      onClick={openModal}
      className="booking-item"
    >
      <IonBadge
        color={getBookingStatusColor(booking)}
        slot="start"
        className="test"
      >
        {booking.seat}
      </IonBadge>
      <IonLabel>
        <IonText color="dark">
          <h3 className="text-bold">{booking.fullName}</h3>
        </IonText>
        <IonText>
          <p>{booking.boarding.location.name} - {booking.unboarding.location.name}</p>
        </IonText>
      </IonLabel>
      <div slot="end" className="actions">
        <IonNote>{getBookingStatusText(booking)}</IonNote>
        <IonFab
          vertical="center"
          horizontal="end"
          onClick={(event) => event.stopPropagation()}>
          <IonFabButton size="small" color="secondary" href={`tel:${booking.phone}`}>
            <IonIcon size="small" aria-hidden="true" icon={call}></IonIcon>
          </IonFabButton>
        </IonFab>
      </div>
    </IonItem>
  );
}

export default PassengerCard;
