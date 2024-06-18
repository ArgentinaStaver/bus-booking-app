import { IonIcon, IonItem, IonRadio, IonRadioGroup } from "@ionic/react";
import { cardOutline, walletSharp } from "ionicons/icons";
import { PaymentType } from "../../data-models/types/PricesTypes";

interface IPaymentMethodGroup {
  paymentType: PaymentType | null;
  handlePaymentType: (data: PaymentType) => void;
}

const PaymentTypeGroup: React.FC<IPaymentMethodGroup> = ({ paymentType, handlePaymentType }) => {
  const handlePaymentMethod = (ev: CustomEvent) => {
    const value = ((ev.detail as HTMLIonRadioElement).value) as PaymentType;
    handlePaymentType(value);
  }

  return (
    <IonRadioGroup
      allowEmptySelection={true}
      value={paymentType}
      onIonChange={handlePaymentMethod}
    >
      <IonItem>
        <IonIcon icon={walletSharp} className="ion-padding-end"></IonIcon>
        <IonRadio value="cash">Numerar</IonRadio>
      </IonItem>
      <IonItem lines="none">
        <IonIcon icon={cardOutline} className="ion-padding-end"></IonIcon>
        <IonRadio value="card">Card</IonRadio>
      </IonItem>
    </IonRadioGroup>
  );
}

export default PaymentTypeGroup;
