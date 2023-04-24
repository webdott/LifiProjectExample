import Cards from '../cards';
import Layout from '../../../layout/EsportsLayout';
import Loader from '../Loader/Loader';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { allSportsAndGames } from '../../../constants/matches';
import MatchesContainer from '../sports/matchesContainer';

function Esport(): JSX.Element {
  const { data, error, loading } = useTypedSelector((state) => state.games);

  return (
    <Layout>
      <Cards games={data} />
      {!error && !loading ? (
        <MatchesContainer games={allSportsAndGames.filter((game) => game.type === 'esports')} />
      ) : (
        <>
          <Loader />
        </>
      )}
    </Layout>
  );
}

export default Esport;
