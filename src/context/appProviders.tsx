import { Provider } from 'react-redux';
import { store } from '../store/store';
import { AuthProvider } from './authContext';
import { NotificationProvider } from './notificationContext';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </AuthProvider>
    </Provider>
  );
};

export default AppProviders;
