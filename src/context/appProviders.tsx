import { Provider } from 'react-redux';
import { store } from '../services/store';
import { AuthProvider } from './authContext';
import { UserProvider } from './userContext';
import { BasketProvider } from './basketContext';
import { NotificationProvider } from './notificationContext';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <UserProvider>
          <BasketProvider>
            <NotificationProvider>{children}</NotificationProvider>
          </BasketProvider>
        </UserProvider>
      </AuthProvider>
    </Provider>
  );
};

export default AppProviders;
