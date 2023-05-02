import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const RedirectPage = () => {
  const { redirectUrl } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectUrl !== 'gnosis' && redirectUrl !== 'polygon') navigate(`/gnosis/${redirectUrl}`);
    if (location.pathname === '/') navigate('/gnosis');
  }, []);

  return <div style={{ background: '#0c0c0c', height: '100vh', width: '100vw' }} />;
};

export default RedirectPage;
