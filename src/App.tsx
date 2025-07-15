import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout';
import Routes from './router';
import ScrollToTop from './utils/ScrollToTop';
import AppProviders from './context/appProviders';

const App = () => {
  return (
    <AppProviders>
      <BrowserRouter>
        <Layout>
          <ScrollToTop />
          <Routes />
        </Layout>
      </BrowserRouter>
    </AppProviders>
  );
};

export default App;
