import { Route, Routes, Navigate } from 'react-router-dom';
import { useAccount, useNetwork } from 'wagmi';

import UserAccount from '../pages/user/account';
import Error404 from '../pages/error404';
import Gxp from '../components/shared/gxpPage';
import Mint from '../components/shared/mintPage';
import Upgrade from '../components/shared/upgradePage';
import Help from '../components/shared/helpPage';
import Esports from '../components/shared/esports';
import Sports from '../components/shared/sports';
import Home from '../components/shared/home';
import GetXDAIPage from '../components/shared/getXDAIPage';
import BuyWithCardPage from '../components/shared/buyWithCardPage';
import BuyWithCryptoPage from '../components/shared/buyWithCryptoPage';
import GetUSDTPage from '../components/shared/getUSDTPage';
import MatchPage from '../components/featured/matches/matchPage';
import { CHAIN_IDS } from '../constants/wallet';

const RouterComp = () => {
  const { isConnected: walletIsConnected } = useAccount();
  const { chain } = useNetwork();

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sports' element={<Sports />} />
      <Route path='*' element={<Error404 />} />
      <Route
        path={'/account'}
        element={walletIsConnected ? <UserAccount /> : <Navigate replace to={'/'} />}
      />
      <Route path='/membership' element={<Gxp />} />
      <Route path='/mint' element={<Mint />} />
      <Route path='/upgrade' element={<Upgrade />} />
      {/* Invite Page commented incase of future reversal*/}
      {/* <Route path={"/invite"} element={<Invite />} /> */}
      <Route path='/help' element={<Help />} />
      <Route path='/esports' element={<Esports />} />
      <Route path='/:sportHub/:sport/:gameId' element={<MatchPage />} />
      <Route
        path={'/get-funds'}
        element={chain?.id === CHAIN_IDS.POLYGON ? <GetUSDTPage /> : <GetXDAIPage />}
      />
      <Route path='/buy-with-crypto' element={<BuyWithCryptoPage />} />
      <Route path='/buy-with-card' element={<BuyWithCardPage />} />
    </Routes>
  );
};

export default RouterComp;
