import { Route, Routes } from 'react-router-dom';

import BuyWithCryptoPage from '../components/shared/buyWithCryptoPage';
import RedirectPage from '../pages/redirect';

const RouterComp = () => {
  return (
    <Routes>
      <Route path='/' element={<RedirectPage />} />
      <Route path='/:selectedChain/get-funds/buy-with-crypto/*' element={<BuyWithCryptoPage />} />
      <Route path='*' element={<RedirectPage />} />
    </Routes>
  );
};

export default RouterComp;
