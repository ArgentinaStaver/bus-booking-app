import { useContext, useState } from "react";
import {
	IonAlert,
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonContent,
	IonFooter,
	IonIcon,
	IonInput,
	IonItem,
	IonLoading,
	IonNote,
	IonSelect,
	IonSelectOption,
	IonText,
	IonToolbar,
	useIonAlert,
} from "@ionic/react";
import { pinSharp, flagOutline, trashOutline, checkmarkOutline, book } from "ionicons/icons";
import { BookingModel } from "../../data-models/bookings/bookingModel";
import { updateBooking } from "../../api/booking";
import { UserContext } from "../../context/user/userContext";
import { BookingRequestModel } from "../../data-models/bookings/BookingRequestModel";
import PaymentTypeGroup from "../../components/PassengerCard/PaymentTypeGroup";
import { PaymentType } from "../../data-models/types/PricesTypes";
import "./TripPage.css";

interface PassengerCardDetails {
	booking: BookingModel;
	onUpdate: () => void;
	closeModal: () => void;
}

const PassengerModal: React.FC<PassengerCardDetails> = ({ booking, onUpdate, closeModal }) => {
	const { user } = useContext(UserContext);
	const [paymentType, setPaymentType] = useState<PaymentType | null>(null);
	const [cashedAmmount, setCashedAmmount] = useState<number>(booking.price);
	const [currency, setCurrency] = useState<string>(booking.currency);
	const [loading, setLoading] = useState<boolean>(false);
	const [alert] = useIonAlert();

	const handleBookingUpdate = async () => {
		const bookingPartialUpdate: Partial<BookingRequestModel> = {
			price: cashedAmmount,
			currency,
			paymentCompleted: true,
			meta: {
				...booking?.meta,
				paymentType: paymentType,
				payment: {
					type: paymentType,
				},
				boardingInfo: {
					driverId: user?.id || '',
					boarded: true,
					noShow: false,
				}
			}
		}
		setLoading(true);
		const { data, status } = await updateBooking(booking.id, bookingPartialUpdate);
		setLoading(false);

		if (status === 200 && data) {
			onUpdate();
			closeModal();
			alert({
				header: booking.fullName,
				message: 'A fost imbarcat/a cu succes',
				buttons: ['Ok'],
			})
		} else {
			alert({
				header: 'Eroare',
				message: 'Nu s-a putut inregistra imbarcarea.',
				buttons: ['Ok'],
			})
		}
	};

	const handleNoShowBookingUpdate = async () => {
		const bookingPartialUpdateNoShow: Partial<BookingRequestModel> = {
			meta: {
				...booking?.meta,
				paymentType: null,
				payment: {
					type: null,
				},
				boardingInfo: {
					driverId: user?.id || '',
					boarded: false,
					noShow: true,
				}
			}
		}

		setLoading(true);
		const { data, status } = await updateBooking(booking.id, bookingPartialUpdateNoShow);
		setLoading(false);

		if (status === 200 && data) {
			onUpdate();
			closeModal();
			alert({
				header: booking.fullName,
				message: 'Este marcat/a ca neprezentat/a',
				buttons: ['Ok'],
			})
		} else {
			alert({
				header: 'Eroare',
				message: 'Nu s-a putut marca neprezent/a.',
				buttons: ['Ok'],
			})
		}
	}

	const handleSoftDeleteBooking = async () => {
		const bookingPartialUpdateSoftDelete: Partial<BookingRequestModel> = {
			deleted: true,
		}

		const { data, status } = await updateBooking(booking.id, bookingPartialUpdateSoftDelete);

		if (status === 200 && data) {
			onUpdate();
			closeModal();
			alert({
				header: booking.fullName,
				message: 'Rezervarea este anulata',
				buttons: ['Ok'],
			})
		} else {
			alert({
				header: 'Eroare',
				message: 'Nu s-a putut efectua anularea.',
				buttons: ['Ok'],
			})
		}
	}

	const handleCashedAmmount = (ev: Event) => {
		const value = (ev.target as HTMLIonInputElement).value as number;
		setCashedAmmount(value);
	}

	const handleCurrency = (ev: Event) => {
		const value = (ev.target as HTMLSelectElement).value as string;
		setCurrency(value);
	}

	const getFlightInfo = (flightInfo: BookingModel['meta']['flightInfo']) => {
		if (flightInfo.takeOffTime) {
			return ` Ora decolarii - ${flightInfo.takeOffTime || "---"}`
		} else if (flightInfo.landingTime) {
			return ` ${flightInfo.airport || "---"} /
			${flightInfo.flightNumber || "---"} / ${flightInfo.landingTime || "---"}`
		}

		return null;
	}

	return (
		booking &&
		<>
			<IonContent color="light">
				<IonCard color="light">
					<IonCardHeader>
						<IonCardTitle color="medium">Loc {booking.seat}</IonCardTitle>
						<IonCardSubtitle>Statii</IonCardSubtitle>
					</IonCardHeader>
					<IonCardContent>
						<IonItem>
							<IonIcon slot="start" size="small" icon={pinSharp} />
							<IonText>
								<p>{booking.boarding.location.name}</p>
							</IonText>
							<IonNote slot="end">{booking.boarding.name}</IonNote>
						</IonItem>
						<IonItem>
							<IonIcon slot="start" size="small" icon={flagOutline} />
							<IonText>
								<p>{booking.unboarding.location.name}</p>
							</IonText>
							<IonNote slot="end">{booking.unboarding.name}</IonNote>
						</IonItem>
					</IonCardContent>
				</IonCard>
				<IonCard color="light">
					<IonCardHeader>
						<IonCardSubtitle>Mentiuni</IonCardSubtitle>
					</IonCardHeader>
					<IonCardContent>
						{(!booking.meta.flightInfo && !booking.meta.notes) && "---"}
						{
							booking.meta.flightInfo ?
								<IonText><p>Info zbor:{getFlightInfo(booking.meta.flightInfo)}</p></IonText> :
								null
						}
						{<IonText>{booking.meta.notes ? booking.meta.notes : null}</IonText>}
					</IonCardContent>
				</IonCard>
				<IonCard color="light">
					<IonCardHeader>
						<IonCardSubtitle>Pret</IonCardSubtitle>
					</IonCardHeader>
					<IonCardContent>
						<IonItem>
							<IonInput
								label="Introdu suma"
								placeholder="Suma incasata"
								labelPlacement="stacked"
								fill="solid"
								type="number"
								inputMode="numeric"
								value={cashedAmmount}
								disabled={booking.paymentCompleted}
								onIonChange={handleCashedAmmount}
							/>
							<IonSelect
								value={currency}
								disabled={booking.paymentCompleted}
								onIonChange={handleCurrency}
							>
								<IonSelectOption value="RON">RON</IonSelectOption>
								<IonSelectOption value="EUR">EUR</IonSelectOption>
								<IonSelectOption value="MDL">MDL</IonSelectOption>
							</IonSelect>
						</IonItem>
					</IonCardContent>
				</IonCard>
				{
					!booking.paymentCompleted &&
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
				}

			</IonContent>
			<IonFooter>
				<IonToolbar>
					{
						!booking.paymentCompleted &&
						<>
							<IonButton
								id="present-alert"
								color="danger"
								slot="start"
								className="footerLeftSpace"
								disabled={!booking.meta.boardingInfo?.noShow}
								shape="round"
							>
								<IonIcon icon={trashOutline} size="large"></IonIcon>
							</IonButton>
							<IonAlert
								header="Sigur doriti sa anulati rezervarea?"
								trigger="present-alert"
								buttons={[
									{
										text: 'Nu',
										role: 'cancel',
										handler: () => {
											closeModal();
										},
									},
									{
										text: 'Da',
										role: 'confirm',
										handler: () => handleSoftDeleteBooking(),
									},
								]}
							>
							</IonAlert>
						</>
					}
					<IonButton
						id="noShow-alert"
						color="warning"
						shape="round"
						disabled={booking.meta.boardingInfo?.boarded || booking.meta.boardingInfo?.noShow}
					>
						Neprezentat
					</IonButton>
					<IonAlert
						trigger="noShow-alert"
						header="Sigur doriti sa marcati ca neprezentat?"
						buttons={[
							{
								text: 'Nu',
								role: 'cancel',
								handler: () => {
									closeModal();
								},
							},
							{
								text: 'Da',
								role: 'confirm',
								handler: () => handleNoShowBookingUpdate(),
							},
						]}
					>
					</IonAlert>
					<IonButton
						id="open-loading"
						slot="end"
						onClick={handleBookingUpdate}
						shape="round"
						className="footerRightSpace"
						disabled={booking.meta.boardingInfo?.boarded || (!booking.paymentCompleted && !paymentType)}
					>
						<IonIcon size="large" icon={checkmarkOutline}></IonIcon>
					</IonButton>
					<IonLoading trigger="open-loading" isOpen={loading}></IonLoading>
				</IonToolbar>
			</IonFooter>
		</>
	);
}

export default PassengerModal;
