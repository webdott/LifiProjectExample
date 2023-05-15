import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { gnosis, polygon } from 'wagmi/chains';

import Cards from '../cards';
import Layout from '../../../layout/HomePage';
import Loader from '../Loader/Loader';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import MatchesContainer from './matchesContainer';
import { getFeaturedGames, getSportsWithGames } from '../../../helpers/redux';
import { SportHubSlug } from '../../../constants/sports';
import { fetchFeaturedGames, fetchGames, fetchSports } from '../../../redux/action-creators';
import { getSelectedChainFromBase } from '../../../functions';

function Home(): JSX.Element {
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
        hubSlugs: [SportHubSlug.sports, SportHubSlug.esports],
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

  useEffect(() => {
    fetchFeaturedGames({ chainId })(dispatch);
  }, [chainId, sportsData]);

  return (
    <Layout>
      <Cards games={getFeaturedGames()} />
      {!gamesError && !sportsError && !gamesLoading && !sportsLoading ? (
        <MatchesContainer
          sports={getSportsWithGames([SportHubSlug.sports, SportHubSlug.esports])}
        />
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default Home;
