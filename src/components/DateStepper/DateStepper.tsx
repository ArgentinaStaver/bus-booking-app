import { IonFabButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { useEffect, useState } from 'react';
import { add, isAfter, isBefore } from 'date-fns';
import { getDateTimeString } from './timeUtils';
import { arrowBack, arrowForward } from 'ionicons/icons';

interface IDateStepper {
  date: Date;
  min?: Date;
  max?: Date;
  onChange: (date: Date) => void;
}

const DateStepper = ({ date, min, max, onChange }: IDateStepper) => {
  const [nextDate, setNextDate] = useState<Date>(add(new Date(date), { days: 1 }));
  const [previousDate, setPreviousDate] = useState<Date>(add(new Date(date), { days: -1 }));

  const handleNextDate = () => {
    if (nextDate) onChange(nextDate);
  }
  const handlePrevDate = () => {
    if (previousDate) onChange(previousDate);
  }

  useEffect(() => {
    setNextDate(add(new Date(date), { days: 1 }));
    setPreviousDate(add(new Date(date), { days: -1 }));
  }, [date]);

  return (
    <IonItem>
      {previousDate ?
        <IonFabButton
          disabled={min && isAfter(min, date)}
          size='small'
          color='primary'
          onClick={handlePrevDate}
        >
          <IonIcon icon={arrowBack} size='small'></IonIcon>
        </IonFabButton> : null
      }
      <IonLabel class="ion-text-center" className='date-stapper'>
        {getDateTimeString(date, { shortDayName: false, shortMonthName: false })}
      </IonLabel>
      {nextDate ?
        <IonFabButton
          disabled={max && isBefore(date, max)}
          size='small'
          color='primary'
          onClick={handleNextDate}
        >
          <IonIcon icon={arrowForward} size='small'></IonIcon>
        </IonFabButton> : null
      }
    </IonItem>
  );
};

export default DateStepper;
