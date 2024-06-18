import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonPopover,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
import { settingsOutline } from 'ionicons/icons';
import { fetchTrips } from '../../api/trips';
import { UserContext } from '../../context/user/userContext';
import { CarsContext } from '../../context/cars/carsContext';
import TripCard from '../../components/TripCard/TripCard';
import DateStepper from '../../components/DateStepper/DateStepper';
import HomePageSkeleton from '../../components/SkeletonContent/HomePageSkeleton';
import TripModel from '../../data-models/trip/TripModel';
import { FilterTripsCriteriaType } from '../../data-models/types/TripTypes';
import { UserModel } from '../../data-models/user/UserModel';
import { HOMEPAGE_MENU_STATE } from '../../utils/constants';

const HomePage: React.FC = () => {
  const { user, users, handleLogout, fetchUsers } = useContext(UserContext);
  const { cars, fetchCars } = useContext(CarsContext);
  const history = useHistory();
  const [trips, setTrips] = useState<TripModel[]>([]);
  const [filterTripsCriteria, setFilterTripsCriteria] = useState<FilterTripsCriteriaType>('driversTrips');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loaded, setLoaded] = useState<boolean>(false);
  const today = new Date();

  const openPassengersList = (trip: any) => {
    history.push(`/trip/${trip.id}`);
  };

  const filterTrips = (trip: TripModel, user: UserModel | null, filterTripsCriteria: FilterTripsCriteriaType) => {
    if (!user) return false;
    if (filterTripsCriteria === 'all') return true;

    return trip.cars.drivers.includes(user?.id || "");
  }

  useEffect(() => {
    setLoaded(false);
    fetchTrips({ date: selectedDate }).then(({ data }) => {
      setTrips(data);
      setLoaded(true);
    });

    if (users.length === 0) fetchUsers();
    if (cars.length === 0) fetchCars();
  }, [selectedDate]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  }

  const handleMinDate = () => {
    if (user?.role.name !== 'ADMIN') {
      return today;
    }
  }

  const homePageMenuState = async (newCriteria: FilterTripsCriteriaType) => {
    await Preferences.set({
      key: HOMEPAGE_MENU_STATE,
      value: newCriteria,
    });
  }

  const handleFilterTripsCriteria = (criteria: FilterTripsCriteriaType) => {
    setFilterTripsCriteria(criteria);
    homePageMenuState(criteria);
  }

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      fetchTrips({ date: selectedDate }).then(({ data }) => {
        setTrips(data);
      });
      event.detail.complete();
    }, 2000)
  }

  useEffect(() => {
    Preferences.get({ key: HOMEPAGE_MENU_STATE }).then((criteria) => {
      setFilterTripsCriteria(criteria.value as FilterTripsCriteriaType || filterTripsCriteria);
    })
  }, []);

  const filteredTrips = trips.filter((trip) => filterTrips(
    trip,
    user,
    filterTripsCriteria
  )).sort((a, b) => (new Date(a.departure).getTime() - new Date(b.departure).getTime()));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='secondary'>
          {
            user?.role.name === "DRIVER" ?
              <IonTitle>Cursele mele</IonTitle> :
              <IonTitle>{filterTripsCriteria === 'all' ? "Toate cursele" : "Cursele mele"}</IonTitle>
          }
          <IonButtons slot='end'>
            <IonButton id="popover-button">
              <IonIcon size="small" aria-hidden="true" icon={settingsOutline}></IonIcon>
            </IonButton>
            <IonPopover trigger='popover-button' dismissOnSelect={true}>
              <IonContent>
                <IonList>
                  {
                    user?.role.name !== "DRIVER" &&
                    <>
                      <IonItem button={true} detail={false} onClick={() => handleFilterTripsCriteria('driversTrips')}>Cursele mele</IonItem>
                      <IonItem button={true} detail={false} onClick={() => handleFilterTripsCriteria('all')}>Toate cursele</IonItem>
                    </>
                  }
                  <IonItem button={true} detail={false} onClick={handleLogout} lines='none'>Deconectare</IonItem>
                </IonList>
              </IonContent>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <DateStepper
          date={selectedDate}
          min={handleMinDate()}
          onChange={handleDateChange}
        />
        {!loaded && [1, 2, 3].map((value) => <HomePageSkeleton key={value} />)}
        {
          filteredTrips.length === 0 && loaded &&
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Pentru aceasta data nu aveti alocate curse!</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        }
        {
          filteredTrips.map((trip) => (
            <TripCard
              key={trip.id}
              user={user}
              trip={trip}
              handleTripCard={() => openPassengersList(trip)}
            />
          ))
        }
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonTitle>{user?.firstName} {user?.lastName}</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default HomePage;
