import Cards from '../cards';
import Layout from '../../../layout/HomePage';
import Loader from '../Loader/Loader';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import MatchesContainer from '../sports/matchesContainer';
import { getGamesByLeageus } from '../../../helpers/redux';
import { SportHubSlug } from '../../../constants/sports';
import { useDispatch } from 'react-redux';
import { useNetwork } from 'wagmi';
import { fetchAllGames } from '../../../redux/action-creators';
import { useEffect } from 'react';
import { polygon } from 'wagmi/chains';

function Esport(): JSX.Element {
  const dispatch = useDispatch();
  const { chain } = useNetwork();

  const { data, error, loading } = useTypedSelector((state) => state.games);

  useEffect(() => {
    fetchAllGames(chain?.id || polygon.id, [SportHubSlug.esports])(dispatch);
  }, [chain]);

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
