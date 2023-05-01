import Cards from '../cards';
import Layout from '../../../layout/HomePage';
import Loader from '../Loader/Loader';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import MatchesContainer from './matchesContainer';
import { getGamesByLeageus } from '../../../helpers/redux';
import { SportHubSlug } from '../../../constants/sports';

function Home(): JSX.Element {
  const { data, error, loading } = useTypedSelector((state) => state.games);

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
