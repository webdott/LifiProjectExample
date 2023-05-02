import Cards from '../cards';
import Layout from '../../../layout/HomePage';
import Loader from '../Loader/Loader';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import MatchesContainer from './matchesContainer';
import { getGamesByLeageus } from '../../../helpers/redux';
import { SportHubSlug } from '../../../constants/sports';
import { useDispatch } from 'react-redux';
import { useNetwork } from 'wagmi';
import { useEffect } from 'react';
import { fetchAllGames } from '../../../redux/action-creators';
import { polygon } from 'wagmi/chains';

function Sport(): JSX.Element {
  const dispatch = useDispatch();
  const { chain } = useNetwork();

  const { data, error, loading } = useTypedSelector((state) => state.games);

  useEffect(() => {
    fetchAllGames(chain?.id || polygon.id, [SportHubSlug.sports])(dispatch);
  }, [chain]);

  return (
    <Layout>
      <Cards games={data} />
      {!error && !loading ? (
        <MatchesContainer games={getGamesByLeageus([SportHubSlug.sports])} />
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default Sport;
