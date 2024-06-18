import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonRouter,
} from '@ionic/react';
import { useState, useContext, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import { logInOutline } from 'ionicons/icons';
import { jwtDecode } from 'jwt-decode';
import { authenticate } from '../../api/authentication';
import { ACCESS_TOKEN } from '../../utils/constants';
import { UserContext } from '../../context/user/userContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert] = useIonAlert();
  const router = useIonRouter();
  const { isAuth, fetchUser } = useContext(UserContext);

  useEffect(() => {
    if (isAuth) {
      router.push('/home');
    }
  }, [isAuth]);

  const handleLogin = async (event: any) => {
    event.preventDefault();

    if (!email || !password) {
      alert({
        header: 'Invalid Credentials',
        message: 'There is no user with such name and password',
        buttons: ['Ok'],
      });
      return;
    }

    const { data, status } = await authenticate({
      email,
      password,
    });

    if (status === 404 || !data) {
      alert('Eroare: Username sau Parola incorecte!');
    } else {
      Preferences.set({ key: ACCESS_TOKEN, value: data.token });
      const decoded = jwtDecode<{ userId: string }>(data.token);

      await fetchUser!(decoded.userId);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='secondary'>
          <IonTitle>Autentificare</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <IonCard>
          <IonCardContent>
            <form onSubmit={handleLogin}>
              <IonInput
                type='email'
                label='Email'
                labelPlacement='floating'
                fill='outline'
                onIonInput={(ev: Event) =>
                  setEmail((ev.target as HTMLInputElement).value)
                }
              />
              <IonInput
                type='password'
                label='Password'
                labelPlacement='floating'
                fill='outline'
                className='ion-margin-top'
                onIonInput={(ev: Event) =>
                  setPassword((ev.target as HTMLInputElement).value)
                }
              />
              <IonButton
                type='submit'
                className='ion-margin-top'
                expand='block'
              >
                Login
                <IonIcon icon={logInOutline} slot='end'></IonIcon>
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
