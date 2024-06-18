import {
  IonSkeletonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
} from "@ionic/react";

const HomePageSkeleton: React.FC = () => {
  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle className="trip-card-title">
            <IonSkeletonText animated={true} style={{ width: '80px' }}></IonSkeletonText>
          </IonCardTitle>
          <IonCardSubtitle mode="md">
            <IonSkeletonText animated={true} style={{ width: '80%' }}></IonSkeletonText>
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid className="ion-no-padding">
            <IonRow>
              <IonCol size="6">
                <IonChip className="trip-chip-info ion-no-margin" outline>
                  <IonSkeletonText animated={true} style={{ width: '60%' }}></IonSkeletonText>
                </IonChip>
              </IonCol>
              <IonCol size="6" className="ion-justify-content-end display-flex">
                <IonChip className="trip-chip-info" outline>
                  <IonSkeletonText animated={true} style={{ width: '60%' }}></IonSkeletonText>
                </IonChip>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6" className="ion-align-items-center display-flex">
                <IonText>
                  <IonSkeletonText animated={true} style={{ width: '80%' }}></IonSkeletonText>
                </IonText>
              </IonCol>
              <IonCol size="6" className="ion-justify-content-end display-flex">
                <IonChip color="success" className="trip-chip-info" outline>
                  <IonSkeletonText animated={true} style={{ width: '80%' }}></IonSkeletonText>
                </IonChip>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </>
  );
}

export default HomePageSkeleton;
