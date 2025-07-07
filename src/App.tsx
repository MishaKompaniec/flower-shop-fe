import { BrowserRouter } from 'react-router-dom';

import { Layout } from './components/layout';
import { BasketProvider } from './context/basketContext';
import Routes from './router';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  return (
    <BasketProvider>
      <BrowserRouter>
        <Layout>
          <ScrollToTop />
          <Routes />
        </Layout>
      </BrowserRouter>
    </BasketProvider>
  );
}

export default App;
