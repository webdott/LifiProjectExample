import { Route, Routes, Navigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

import UserAccount from '../pages/user/account';
import Error404 from '../pages/error404';
import Gxp from '../components/shared/gxpPage';
import Mint from '../components/shared/mintPage';
import Upgrade from '../components/shared/upgradePage';
import Help from '../components/shared/helpPage';
import Esports from '../components/shared/esports';
import Sports from '../components/shared/sports';
import Home from '../components/shared/home';
import GetFundsPage from '../components/shared/getFundsPage';
import BuyWithCardPage from '../components/shared/buyWithCardPage';
import BuyWithCryptoPage from '../components/shared/buyWithCryptoPage';
import MatchPage from '../components/featured/matches/matchPage';
import RedirectPage from '../pages/redirect';

const RouterComp = () => {
  const { isConnected: walletIsConnected } = useAccount();

  return (
    <Routes>
      <Route path='/' element={<RedirectPage />} />
      <Route path='/polygon' element={<Home />} />
      <Route path='/gnosis' element={<Home />} />
      <Route path='/help' element={<Help />} />
      <Route path='/:redirectUrl' element={<RedirectPage />} />
      <Route path='/:selectedChain/sports' element={<Sports />} />
      <Route
        path={'/:selectedChain/account'}
        element={walletIsConnected ? <UserAccount /> : <Navigate replace to={'/'} />}
      />
      <Route path='/:selectedChain/membership' element={<Gxp />} />
      <Route path='/:selectedChain/mint' element={<Mint />} />
      <Route path='/:selectedChain/upgrade' element={<Upgrade />} />
      <Route path='/:selectedChain/esports' element={<Esports />} />
      <Route path={'/:selectedChain/get-funds'} element={<GetFundsPage />} />
      <Route path='/:selectedChain/buy-with-card' element={<BuyWithCardPage />} />
      <Route path='/:selectedChain/buy-with-crypto/*' element={<BuyWithCryptoPage />} />
      {/* To make sure the match url doesn't intercept the buy with crypto route */}
      <Route path='/:selectedChain/sports/:sport/:gameId' element={<MatchPage />} />
      <Route path='/:selectedChain/esports/:sport/:gameId' element={<MatchPage />} />
      {/* To make sure the match url doesn't intercept the buy with crypto route */}
      <Route path='*' element={<Error404 />} />
      {/* Invite Page commented incase of future reversal*/}
      {/* <Route path={"/invite"} element={<Invite />} /> */}
    </Routes>
  );
};

export default RouterComp;
