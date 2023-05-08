import Cards from '../cards';
import Layout from '../../../layout/HomePage';
import Loader from '../Loader/Loader';
import { useLocation } from 'react-router';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import MatchesContainer from '../sports/matchesContainer';
import { getSportsWithGames } from '../../../helpers/redux';
import { SportHubSlug } from '../../../constants/sports';
import { useDispatch } from 'react-redux';
import { fetchGames, fetchSports } from '../../../redux/action-creators';
import { useEffect } from 'react';
import { gnosis, polygon } from 'wagmi/chains';
import { getSelectedChainFromBase } from '../../../functions';

function Esport(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const chainId =
    getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id;

  const {
    list: { data: sportsData, error: sportsError, loading: sportsLoading },
  } = useTypedSelector((state) => state.sports);

  const {
    list: { data: gamesData, error: gamesError, loading: gamesLoading },
    currentSportSlug,
    currentLeagueSlug,
    currentCountrySlug,
  } = useTypedSelector((state) => state.games);

  useEffect(() => {
    (async () => {
      await fetchSports({
        chainId,
        hubSlugs: [SportHubSlug.esports],
      })(dispatch);
    })();
  }, [location.pathname]);

  useEffect(() => {
    fetchGames({
      chainId,
      sportSlug: currentSportSlug,
      leagueSlug: currentLeagueSlug,
      countrySlug: currentCountrySlug,
    })(dispatch);
  }, [sportsData, currentLeagueSlug, currentSportSlug]);

  return (
    <Layout>
      <Cards games={Object.values(gamesData)} />
      {!gamesError && !sportsError && !gamesLoading && !sportsLoading ? (
        <MatchesContainer sports={getSportsWithGames([SportHubSlug.esports])} />
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default Esport;
