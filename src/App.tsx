import { BrowserRouter } from 'react-router-dom';

import { Layout } from './components/layout';
import { BasketProvider } from './context/basketContext';
import Routes from './router';
import ScrollToTop from './utils/ScrollToTop';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { UserProvider } from './context/userContext';
import { AuthProvider } from './context/authContext';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <UserProvider>
          <BasketProvider>
            <BrowserRouter>
              <Layout>
                <ScrollToTop />
                <Routes />
              </Layout>
            </BrowserRouter>
          </BasketProvider>
        </UserProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
