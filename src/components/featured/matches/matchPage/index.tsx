import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';

import MatchHeader from './matchHeader';
import AllMatchOdds from './allMatchOdds';
import Layout from '../../../../layout/HomePage';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { gnosis, polygon } from 'wagmi/chains';
import { useDispatch } from 'react-redux';
import { fetchGames, fetchCurrentGame } from '../../../../redux/action-creators';
import { SportHubSlug } from '../../../../constants/sports';
import { getCurrentGame } from '../../../../helpers/redux';
import { Game } from '../../../../constants/matches';
import { getSelectedChainFromBase } from '../../../../functions';

const MatchPage = () => {
  const [value, setValue] = useState<number>(0);
  const location = useLocation();
  const { sportHub, gameId } = useParams();
  const { initialLoad, currentLeagueSlug, currentSportSlug } = useTypedSelector(
    (state) => state.games
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // Loading initial data for sidebar
    const chainId =
      getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id;
    if (!initialLoad)
      fetchGames({
        chainId,
        sportSlug: currentSportSlug,
        leagueSlug: currentLeagueSlug,
      });

    // Loading current game
    fetchCurrentGame(chainId, gameId as string)(dispatch);
  }, [location.pathname, dispatch, currentSportSlug, currentLeagueSlug]);

  return (
    <Layout>
      <MatchHeader value={value} setValue={setValue} game={getCurrentGame()} />
      {value === 0 && <AllMatchOdds game={getCurrentGame()} />}
    </Layout>
  );
};

export default MatchPage;
