import { useEffect, useRef, useState } from 'react';
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
import {
  fetchFeaturedGames,
  fetchGames,
  fetchSports,
  resetCurrentSlugs,
} from '../../../redux/action-creators';
import { getSelectedChainFromBase } from '../../../functions';

function Home(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const chainId =
    getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id;

  const initialLoad = useRef(false);
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
      await resetCurrentSlugs()(dispatch);
      await fetchSports({
        chainId,
        hubSlugs: [SportHubSlug.sports, SportHubSlug.esports],
      })(dispatch);
      fetchFeaturedGames({ chainId })(dispatch);
      await fetchGames({
        chainId,
      })(dispatch);
      initialLoad.current = true;
    })();
  }, [location.pathname]);

  useEffect(() => {
    if (!initialLoad.current) return;
    fetchGames({
      chainId,
      sportSlug: currentSportSlug,
      leagueSlug: currentLeagueSlug,
      countrySlug: currentCountrySlug,
    })(dispatch);
  }, [currentLeagueSlug, currentSportSlug]);

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
