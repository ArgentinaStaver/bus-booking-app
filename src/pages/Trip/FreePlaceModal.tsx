import { useContext, useState } from "react";
import {
	IonItem,
	IonSelect,
	IonSelectOption,
	IonInput,
	IonContent,
	IonFooter,
	IonButton,
	IonToolbar,
	useIonAlert,
	IonLoading,
	IonCard,
	IonCardHeader,
	IonCardContent,
	IonCardTitle,
	IonCardSubtitle,
} from "@ionic/react";
import TripModel from "../../data-models/trip/TripModel";
import { UserContext } from "../../context/user/userContext";
import { createBooking } from "../../api/booking";
import { BookingOwnerType, PassengerType } from "../../data-models/types/PassengerType";
import { StationActionType } from '../../data-models/types/TripTypes';
import { PaymentType } from "../../data-models/types/PricesTypes";
import PaymentTypeGroup from "../../components/PassengerCard/PaymentTypeGroup";

interface FreePlaceCardDetails {
	trip: TripModel;
	seat: number;
	onUpdate: () => void;
	closeModal: () => void;
}

const FreePlaceModal: React.FC<FreePlaceCardDetails> = ({ trip, seat, closeModal, onUpdate }) => {
	const { user } = useContext(UserContext);
	const [boardingStationId, setBoardingStationId] = useState<string>("");
	const [unboardingStationId, setUnboardingStationId] = useState<string>("");
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [price, setPrice] = useState<number | null>(null);
	const [currency, setCurrency] = useState<string>("RON");
	const [loading, setLoading] = useState<boolean>(false);
	const [paymentType, setPaymentType] = useState<PaymentType | null>(null);
	const [alert] = useIonAlert();

	const passengerDataNotValid = !boardingStationId || !unboardingStationId ||
		(!firstName || firstName.length < 2) ||
		(!lastName || lastName.length < 2) || !price || !currency || !paymentType;

	const getUnboardingStations = () => {
		const { stations } = trip.route;
		const boardingStation = stations.find((val: any) => val.id === boardingStationId);

		if (!boardingStation) return [];

		return stations.filter((station: any) => (station.settings.sequence > boardingStation.settings.sequence) && ["unboarding", "boardingAndUnboarding"].includes(station.settings.action as StationActionType));
	}

	const handleCreateBooking = async () => {
		if (passengerDataNotValid) {
			alert({
				header: 'Eroare',
				message: 'Completeaza toate campurile',
				buttons: ['Ok'],
			});

			return;
		}

		const passenger = {
			firstName: firstName,
			lastName: lastName,
			email: null,
			phone: "+400000000",
			category: 'adult' as PassengerType,

			tripId: trip.id,
			boardingId: boardingStationId,
			unboardingId: unboardingStationId,
			seat,

			createdBy: "AGENT" as BookingOwnerType,
			agentId: user?.id || null,
			passengerId: null,

			price,
			discount: 0,
			currency,
			paymentCompleted: true,
			deleted: false,
			meta: {
				boardingInfo: {
					driverId: user?.id || '', // fix the user context
					boarded: true,
					noShow: false,
				},
				payment: {
					type: paymentType,
				}
			},
		}

		setLoading(true);
		const { status } = await createBooking([passenger]);
		setLoading(false);

		if (status === 200) {
			onUpdate();
			closeModal();
			alert({
				message: 'Rezervare creata cu succes',
				buttons: ['Ok'],
			})
		} else {
			alert({
				header: 'Eroare',
				message: 'Incercati din nou',
				buttons: ['Ok'],
			})
		}
	}

	const handleBoardingStation = (ev: Event) => {
		const value = (ev.target as HTMLSelectElement).value as string;
		setBoardingStationId(value);
	}

	const handleUnboardingStation = (ev: Event) => {
		const value = (ev.target as HTMLSelectElement).value as string;

		setUnboardingStationId(value);
	}

	const handleFirstName = (ev: Event) => {
		const value = (ev.target as HTMLIonInputElement).value as string;
		setFirstName(value);
	}

	const handleLastName = (ev: Event) => {
		const value = (ev.target as HTMLIonInputElement).value as string;
		setLastName(value);
	}

	const handleCurrency = (ev: Event) => {
		const value = (ev.target as HTMLSelectElement).value as string;
		setCurrency(value);
	}

	const handlePrice = (ev: Event) => {
		const value = ((ev.target as HTMLIonInputElement).value) as number;
		setPrice(value);
	}

	return (
		<>
			<IonContent className="ion-padding" color="light">
				<IonCard color='light'>
					<IonCardHeader>
						<IonCardTitle>Loc {seat}</IonCardTitle>
						<IonCardSubtitle>Statii</IonCardSubtitle>
					</IonCardHeader>
					<IonCardContent>
						<IonItem>
							<IonSelect
								label="Imbarcare"
								placeholder="din"
								aria-label="imbarcare"
								onIonChange={handleBoardingStation}
							>
								{
									trip.route.stations.sort((a: any, b: any) => a.settings.sequence - b.settings.sequence).map((station: any) => (
										<IonSelectOption key={station.id} value={station.id}>
											{station.settings.sequence} - {station.location.name}, {station.name}
										</IonSelectOption>
									))
								}
							</IonSelect>
						</IonItem>
						<IonItem lines="none">
							<IonSelect
								label="Debarcare"
								placeholder="in"
								aria-label="debarcare"
								disabled={!boardingStationId}
								onIonChange={handleUnboardingStation}
							>
								{
									getUnboardingStations().map((unboardingStation: any) => (
										<IonSelectOption key={unboardingStation.id} value={unboardingStation.id}>
											{unboardingStation.settings.sequence} - {unboardingStation.location.name}, {unboardingStation.name}
										</IonSelectOption>
									))
								}
							</IonSelect>
						</IonItem>
					</IonCardContent>
				</IonCard>
				<IonCard color="light">
					<IonCardHeader>
						<IonCardSubtitle>Date pasager</IonCardSubtitle>
					</IonCardHeader>
					<IonCardContent>
						<IonItem>
							<IonInput
								label="Numele"
								labelPlacement="stacked"
								type="text"
								value={lastName}
								onIonChange={handleLastName}
							/>
						</IonItem>
						<IonItem lines="none">
							<IonInput
								label="Prenumele"
								labelPlacement="stacked"
								type="text"
								value={firstName}
								onIonChange={handleFirstName}
							/>
						</IonItem>
					</IonCardContent>
				</IonCard>
				<IonCard color="light">
					<IonCardHeader>
						<IonCardSubtitle>Pret</IonCardSubtitle>
					</IonCardHeader>
					<IonCardContent>
						<IonItem>
							<IonInput
								label="Suma"
								placeholder="Suma incasata"
								labelPlacement="stacked"
								type="number"
								inputMode="numeric"
								value={price}
								onIonChange={handlePrice}
							/>
						</IonItem>
						<IonItem lines="none">
							<IonSelect
								value={currency}
								onIonChange={handleCurrency}
							>
								<IonSelectOption value="RON">RON</IonSelectOption>
								<IonSelectOption value="EUR">EUR</IonSelectOption>
								<IonSelectOption value="MDL">MDL</IonSelectOption>
							</IonSelect>
						</IonItem>
					</IonCardContent>
				</IonCard>
				<IonCard color="light">
					<IonCardHeader>
						<IonCardSubtitle>Metoda de plata</IonCardSubtitle>
					</IonCardHeader>
					<IonCardContent>
						<PaymentTypeGroup
							paymentType={paymentType}
							handlePaymentType={setPaymentType}
						/>
					</IonCardContent>
				</IonCard>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton
						id="open-loading"
						slot="end"
						className="ion-margin-end"
						disabled={passengerDataNotValid}
						onClick={handleCreateBooking}
					>
						Salveaza
					</IonButton>
					<IonLoading trigger="open-loading" isOpen={loading}></IonLoading>
				</IonToolbar>
			</IonFooter>
		</>
	);
}

export default FreePlaceModal;
