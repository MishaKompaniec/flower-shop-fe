import { Provider } from 'react-redux';
import { store } from '../store/store';
import { AuthProvider } from './authContext';
import { UserProvider } from './userContext';
import { NotificationProvider } from './notificationContext';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <UserProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </UserProvider>
      </AuthProvider>
    </Provider>
  );
};

export default AppProviders;
