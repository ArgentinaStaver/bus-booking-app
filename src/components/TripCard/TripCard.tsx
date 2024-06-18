import { useContext } from "react";
import {
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonGrid, IonIcon, IonLabel, IonRow, IonText
} from "@ionic/react";
import { peopleSharp, personAddSharp } from 'ionicons/icons';
import { format, differenceInMinutes } from "date-fns";
import Lottie from "react-lottie";
import TripModel from "../../data-models/trip/TripModel";
import { UserModel } from "../../data-models/user/UserModel";
import { UserContext } from "../../context/user/userContext";
import { CarsContext } from "../../context/cars/carsContext";
import animationData from '../../lotties/live.json';
import './TripCard.css';

interface TripCardList {
  trip: TripModel;
  user: UserModel | null;
  handleTripCard: () => void;
}

const TripCard: React.FC<TripCardList> = ({ trip, user, handleTripCard }) => {
  const { users } = useContext(UserContext);
  const { getCar } = useContext(CarsContext);
  const car = getCar(trip.cars.carId) || null;
  const drivers = users.filter(user => trip.cars.drivers.includes(user.id));
  const timeDiff = differenceInMinutes(trip.departureDateTime, new Date());
  const timeDiffArrival = differenceInMinutes(new Date(), trip.arrivalDateTime);
  const isCardEnable = timeDiff < trip.route.settings.enableBeforeDeparture && timeDiffArrival < 30;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <IonCard
      onClick={handleTripCard}
      className={`trip-card ion-no-padding ${trip.active ? '' : 'inactive-trip-card'}`}
      disabled={!isCardEnable && user?.role.name === 'DRIVER' || !trip.active}
    >
      <IonCardHeader>
        <IonCardTitle className="trip-card-title">
          {trip.isLive && trip.active &&
            <IonLabel>
              <Lottie
                options={defaultOptions}
                height={20}
                width={30}
              />
            </IonLabel>
          }
          {trip.route.name}
        </IonCardTitle>
        <IonCardSubtitle mode="md">{format(trip.date, 'dd-MM-yyyy')}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol size="6">
              <IonChip className="trip-chip-info ion-no-margin" outline>{car?.plate}</IonChip>
            </IonCol>
            <IonCol size="6" className="ion-justify-content-end display-flex">
              <IonChip className="trip-chip-info" outline>{trip.bookings.length}<IonIcon icon={peopleSharp}></IonIcon></IonChip>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6" className="ion-align-items-center display-flex">
              <IonText>
                {
                  drivers.map((driver) => <p key={driver.id}>{`${driver?.lastName} ${driver?.firstName}`}</p>)
                }
              </IonText>
            </IonCol>
            <IonCol size="6" className="ion-justify-content-end display-flex">
              <IonChip color="success" className="trip-chip-info" outline>
                {car && car.seatsNumber - trip.bookings.length}
                <IonIcon icon={personAddSharp}></IonIcon>
              </IonChip>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
}

export default TripCard;
