import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { gnosis, polygon } from 'wagmi/chains';
import { useDispatch } from 'react-redux';

import Cards from '../cards';
import Layout from '../../../layout/HomePage';
import Loader from '../Loader/Loader';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import MatchesContainer from '../home/matchesContainer';
import { getSportsWithGames } from '../../../helpers/redux';
import { SportHubSlug } from '../../../constants/sports';
import { fetchGames, fetchSports } from '../../../redux/action-creators';
import { getSelectedChainFromBase } from '../../../functions';

function Sport(): JSX.Element {
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
        hubSlugs: [SportHubSlug.sports],
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
        <MatchesContainer sports={getSportsWithGames([SportHubSlug.sports])} />
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default Sport;
