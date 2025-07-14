import { BrowserRouter } from 'react-router-dom';

import { Layout } from './components/layout';
import { BasketProvider } from './context/basketContext';
import Routes from './router';
import ScrollToTop from './utils/ScrollToTop';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { UserProvider } from './context/userContext';

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
