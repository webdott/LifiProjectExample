import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';

import MatchHeader from './matchHeader';
import AllMatchOdds from './allMatchOdds';
import Layout from '../../../../layout/HomePage';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { gnosis, polygon } from 'wagmi/chains';
import { useDispatch } from 'react-redux';
import { fetchAllGames, fetchCurrentGame } from '../../../../redux/action-creators';
import { SportHubSlug } from '../../../../constants/sports';
import { getCurrenGame } from '../../../../helpers/redux';
import { Game } from '../../../../constants/matches';
import { getSelectedChainFromBase } from '../../../../functions';

const MatchPage = () => {
  const [value, setValue] = useState<number>(0);
  const location = useLocation();
  const { sportHub, gameId } = useParams();
  const { initialLoad } = useTypedSelector((state) => state.games);

  const dispatch = useDispatch();

  const getSportHubSlugs = useCallback(() => {
    if (sportHub === 'sports') return [SportHubSlug.sports];
    else return [SportHubSlug.esports];
  }, [location]);

  useEffect(() => {
    // Loading initial data for sidebar
    const chainId =
      getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id;
    if (!initialLoad) fetchAllGames(chainId, getSportHubSlugs())(dispatch);

    // Loading current game
    fetchCurrentGame(chainId, gameId as string)(dispatch);
  }, [location.pathname, getSportHubSlugs, dispatch]);

  return (
    <Layout>
      <MatchHeader value={value} setValue={setValue} game={getCurrenGame()} />
      {value === 0 && <AllMatchOdds game={getCurrenGame()} />}
    </Layout>
  );
};

export default MatchPage;
