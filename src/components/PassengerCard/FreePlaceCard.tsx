import { IonCard, IonCardContent, IonItem, IonNote, IonLabel, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import './FreePlaceCard.css';

interface FreePlaceCardDetails {
  seat: number;
  openModal: () => void;
}

const FreePlaceCard: React.FC<FreePlaceCardDetails> = ({ seat, openModal }) => {
  return (
    <IonCard className="free-place-card" onClick={openModal}>
      <IonCardContent className="ion-no-padding">
        <IonItem lines="none" className="ion-margin-vertical">
          <IonNote slot="start" color="dark" className="text-bold">{seat}</IonNote>
          <IonLabel>Liber</IonLabel>
          <IonLabel slot="end">
            <IonFab vertical="center" horizontal="end" className="addBooking">
              <IonFabButton size="small" color="secondary">
                <IonIcon size="small" aria-hidden="true" icon={add}></IonIcon>
              </IonFabButton>
            </IonFab>
          </IonLabel>
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
}

export default FreePlaceCard;
