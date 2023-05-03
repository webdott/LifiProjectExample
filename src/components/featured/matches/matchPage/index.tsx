import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';

import MatchHeader from './matchHeader';
import AllMatchOdds from './allMatchOdds';
import Layout from '../../../../layout/HomePage';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { gnosis, polygon } from 'wagmi/chains';
import { useDispatch } from 'react-redux';
import { fetchAllGames } from '../../../../redux/action-creators';
import { SportHubSlug } from '../../../../constants/sports';
import { getGame } from '../../../../helpers/redux';
import { Game } from '../../../../constants/matches';
import { getSelectedChainFromBase } from '../../../../functions';

const MatchPage = () => {
  const [value, setValue] = useState<number>(0);
  const location = useLocation();
  const { sportHub, gameId } = useParams();

  const dispatch = useDispatch();

  const { data, loading } = useTypedSelector((state) => state.games);

  const getSportHubSlugs = useCallback(() => {
    if (sportHub === 'sports') return [SportHubSlug.sports];
    else return [SportHubSlug.esports];
  }, [location]);

  useEffect(() => {
    const chainId =
      getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id;
    if (data.length === 0) fetchAllGames(chainId, getSportHubSlugs())(dispatch);
  }, [location.pathname, getSportHubSlugs, dispatch]);

  const getGameIfAvailable = useCallback((): Game | null => {
    if (!loading) return getGame(gameId as string);
    else return null;
  }, [gameId, location.pathname]);
  return (
    <Layout>
      <MatchHeader value={value} setValue={setValue} game={getGameIfAvailable()} />
      {value === 0 && <AllMatchOdds game={getGameIfAvailable()} />}
    </Layout>
  );
};

export default MatchPage;
