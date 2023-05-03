import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { gnosis, polygon } from 'wagmi/chains';

import Cards from '../cards';
import Layout from '../../../layout/HomePage';
import Loader from '../Loader/Loader';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import MatchesContainer from './matchesContainer';
import { getGamesByLeageus } from '../../../helpers/redux';
import { SportHubSlug } from '../../../constants/sports';
import { fetchAllGames } from '../../../redux/action-creators';
import { getSelectedChainFromBase } from '../../../functions';

function Home(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();

  const { data, error, loading } = useTypedSelector((state) => state.games);

  useEffect(() => {
    const chainId =
      getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id;
    fetchAllGames(chainId, [SportHubSlug.sports, SportHubSlug.esports])(dispatch);
  }, [location.pathname]);

  return (
    <Layout>
      <Cards games={data} />
      {!error && !loading ? (
        <MatchesContainer sports={getGamesByLeageus([SportHubSlug.sports, SportHubSlug.esports])} />
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default Home;
