import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout';
import Routes from './router';
import ScrollToTop from './utils/ScrollToTop';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { NotificationProvider } from './context/notificationContext';

const App = () => {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <BrowserRouter>
          <Layout>
            <ScrollToTop />
            <Routes />
          </Layout>
        </BrowserRouter>
      </NotificationProvider>
    </Provider>
  );
};

export default App;
