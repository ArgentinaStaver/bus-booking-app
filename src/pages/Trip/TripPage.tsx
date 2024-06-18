import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonList,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
  useIonAlert,
} from '@ionic/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { scanSharp, printOutline } from 'ionicons/icons';
import PassengerCard from '../../components/PassengerCard/PassengerCard';
import FreePlaceCard from '../../components/PassengerCard/FreePlaceCard';
import TripPageSkeleton from '../../components/SkeletonContent/TripPageSkeleton';
import { CarsContext } from '../../context/cars/carsContext';
import PassengerModal from './PassengerModal';
import FreePlaceModal from './FreePlaceModal';
import { fetchTripById } from '../../api/trips';
import TripModel from '../../data-models/trip/TripModel';
import { BookingModel } from '../../data-models/bookings/bookingModel';
import { REACT_APP_API_BASE_URL } from '../../utils/constants';
import { UserContext } from '../../context/user/userContext';
import { getToken } from '../../services/httpWrappers';
import './TripPage.css';

const TripPage: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [trip, setTrip] = useState<TripModel>();
  const [token, setToken] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<number>(1000);
  const [allocatedSeats, setAllocatedSeats] = useState<
    Map<number, null | BookingModel>
  >(new Map());
  const [loaded, setLoaded] = useState<boolean>(false);
  const { getCar } = useContext(CarsContext);
  const modal = useRef<HTMLIonModalElement>(null);
  const [alert] = useIonAlert();
  const { user } = useContext(UserContext);

  const [isSuported, setIsSuported] = useState<boolean>(false);

  const isScanningSuported = () => {
    BarcodeScanner.isSupported().then((result) => {
      setIsSuported(result.supported);
    })
  }

  useEffect(() => {
    getToken().then((token) => setToken(token.value));
    isScanningSuported();
  }, []);

  const requestPermissions = async (): Promise<boolean> => {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  const scan = async (): Promise<void> => {
    const granted = await requestPermissions();

    if (!granted) alert({
      header: 'Permisiune respinsa',
      message: 'Va rog asigurati accesul la camera telefonului pentru a putea folosi QR scanner.',
      buttons: ['Ok'],
    });

    const { barcodes } = await BarcodeScanner.scan();
    const booking = trip && trip.bookings.find((booking) => booking.id === barcodes[0].displayValue);

    if (booking) {
      handleOpenModal(booking.seat);
    } else {
      alert({
        message: "Rezervarea nu a fost gasita pentru aceasta cursa.",
        buttons: ['Ok'],
      })
    }
  }

  const fetchTrip = async (id: string) => {
    const { data, status } = await fetchTripById(id);

    if (status === 200 && data) {
      const trip = {
        ...data,
        bookings: data.bookings.filter((booking) => !booking.deleted),
      }
      setTrip(trip);

      return trip;
    }

    alert({
      header: 'Eroare',
      message: 'Cursa nu a putut fi gasita in baza de date',
      buttons: ['Ok'],
    });

    return null;
  };

  const generateListOfSeats = (trip: any) => {
    if (!trip) return;

    const car = getCar(trip.cars.carId) || null;
    const noOfSeats = car?.seatsNumber;
    const seatsMap = new Map();

    for (let i = 1; i <= noOfSeats!; i++) {
      seatsMap.set(
        i,
        trip.bookings.find((b: { seat: number }) => b.seat === i) || null
      );
    }

    setAllocatedSeats(seatsMap);
  };

  useEffect(() => {
    setLoaded(false);
    fetchTrip(tripId).then((data) => {
      generateListOfSeats(data);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (trip) generateListOfSeats(trip);
  }, [trip]);

  const dismiss = () => {
    modal.current?.dismiss();
    setIsOpen(false);
  };

  const handleOpenModal = (seat: number) => {
    setIsOpen(true);
    setSelectedSeat(seat);
  };

  const getModalTitle = (booking: BookingModel | null | undefined) => {
    return booking ? booking.fullName : 'Adauga un pasager';
  };

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      fetchTrip(tripId).then((data) => {
        generateListOfSeats(data);
      });
      event.detail.complete();
    }, 2000)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='secondary'>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/home'></IonBackButton>
          </IonButtons>
          <IonTitle>{trip?.route.name}</IonTitle>
          <IonButtons slot='end'>
            <IonFabButton
              color="warning"
              size='small'
              href={`${REACT_APP_API_BASE_URL}/reports/trip/${tripId}?access_token=${token}`}
            >
              <IonIcon size="small" aria-hidden="true" icon={printOutline}></IonIcon>
            </IonFabButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={true}>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {!loaded && <TripPageSkeleton />}
        <IonList>
          {Array.from(allocatedSeats).map(([seat, booking]) =>
            booking ? (
              <PassengerCard
                key={booking.id}
                booking={booking}
                openModal={() => handleOpenModal(seat)}
              />
            ) : (
              <FreePlaceCard
                key={seat}
                seat={seat}
                openModal={() => handleOpenModal(seat)}
              />
            )
          )}
        </IonList>
      </IonContent>
      <IonFooter translucent={true}>
        <IonToolbar class="ion-padding" className='footerToolbar'>
          <IonFab slot="end" horizontal='end'>
            <IonFabButton disabled={!isSuported} onClick={scan}>
              <IonIcon icon={scanSharp} />
            </IonFabButton>
          </IonFab>
          <IonTitle>{user?.firstName} {user?.lastName}</IonTitle>
        </IonToolbar>
      </IonFooter>

      <IonModal ref={modal} isOpen={isOpen}>
        <IonHeader>
          <IonToolbar color='success'>
            <IonButtons slot='end'>
              <IonButton onClick={dismiss}>Inchide</IonButton>
            </IonButtons>
            <IonTitle className='title-large'>
              {getModalTitle(allocatedSeats.get(selectedSeat))}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {
          !!allocatedSeats.get(selectedSeat) && trip ?
            <PassengerModal
              onUpdate={() => fetchTrip(trip.id)}
              booking={allocatedSeats.get(selectedSeat)!}
              closeModal={dismiss}
            />
            : <FreePlaceModal
              trip={trip!}
              seat={selectedSeat}
              closeModal={dismiss}
              onUpdate={() => fetchTrip(trip!.id)}
            />
        }
      </IonModal>
    </IonPage>
  );
};

export default TripPage;
