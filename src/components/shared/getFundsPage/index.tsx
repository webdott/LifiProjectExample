import React from 'react';
import { useParams } from 'react-router-dom';

import GetUSDTPage from '../getUSDTPage';
import GetXDAIPage from '../getXDAIPage';

const GetFundsPage = () => {
  const { selectedChain } = useParams();

  return selectedChain === 'polygon' ? <GetUSDTPage /> : <GetXDAIPage />;
};

export default GetFundsPage;
