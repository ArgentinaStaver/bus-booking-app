import { IonSkeletonText, IonItem, IonLabel, IonList } from "@ionic/react";

const TripPageSkeleton: React.FC = () => {
  return (
    <IonList>
      {[1, 2, 3, 4, 5].map((value) => {
        return (<IonItem className="booking-item" key={value}>
          <IonSkeletonText animated={true} style={{ width: '10%' }}></IonSkeletonText>
          <IonLabel className="ion-padding">
            <h3 className="text-bold">
              <IonSkeletonText animated={true} style={{ width: '80%' }}></IonSkeletonText>
            </h3>
            <p>
              <IonSkeletonText animated={true} style={{ width: '80%' }}></IonSkeletonText>
            </p>
          </IonLabel>
          <IonSkeletonText animated={true} style={{ width: '10%' }} className="ion-margin"></IonSkeletonText>
          <IonSkeletonText animated={true} style={{ width: '7%' }}></IonSkeletonText>
        </IonItem>)
      })}
    </IonList>
  );
}

export default TripPageSkeleton;
