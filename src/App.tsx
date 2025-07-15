import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout';
import { BasketProvider } from './context/basketContext';
import Routes from './router';
import ScrollToTop from './utils/ScrollToTop';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { UserProvider } from './context/userContext';
import { AuthProvider } from './context/authContext';
import { NotificationProvider } from './context/notificationContext';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <UserProvider>
          <BasketProvider>
            <NotificationProvider>
              <BrowserRouter>
                <Layout>
                  <ScrollToTop />
                  <Routes />
                </Layout>
              </BrowserRouter>
            </NotificationProvider>
          </BasketProvider>
        </UserProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
