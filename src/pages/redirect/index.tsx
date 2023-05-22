import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getSelectedChainFromBase } from '../../functions';

const RedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/${getSelectedChainFromBase(location.pathname)}/get-funds/buy-with-crypto`);
  }, []);

  return <div style={{ background: '#0c0c0c', height: '100vh', width: '100vw' }} />;
};

export default RedirectPage;
