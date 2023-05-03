import Cards from '../cards';
import Layout from '../../../layout/HomePage';
import Loader from '../Loader/Loader';
import { useLocation } from 'react-router';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import MatchesContainer from '../sports/matchesContainer';
import { getGamesByLeageus } from '../../../helpers/redux';
import { SportHubSlug } from '../../../constants/sports';
import { useDispatch } from 'react-redux';
import { fetchAllGames } from '../../../redux/action-creators';
import { useEffect } from 'react';
import { gnosis, polygon } from 'wagmi/chains';
import { getSelectedChainFromBase } from '../../../functions';

function Esport(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();

  const { data, error, loading } = useTypedSelector((state) => state.games.list);

  useEffect(() => {
    const chainId =
      getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id;
    fetchAllGames(chainId, [SportHubSlug.esports])(dispatch);
  }, [location.pathname]);

  return (
    <Layout>
      <Cards games={data} />
      {!error && !loading ? (
        <MatchesContainer games={getGamesByLeageus([SportHubSlug.esports])} />
      ) : (
        <>
          <Loader />
        </>
      )}
    </Layout>
  );
}

export default Esport;
