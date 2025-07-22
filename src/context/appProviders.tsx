import { Provider } from 'react-redux';
import { store } from '../store/store';
import { NotificationProvider } from './notificationContext';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <NotificationProvider>{children}</NotificationProvider>
    </Provider>
  );
};

export default AppProviders;
