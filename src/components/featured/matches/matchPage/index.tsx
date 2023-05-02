import { useCallback, useEffect, useState } from 'react';

import MatchHeader from './matchHeader';
import AllMatchOdds from './allMatchOdds';
import Layout from '../../../../layout/HomePage';
import { useNetwork } from 'wagmi';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { polygon } from 'wagmi/chains';
import { useDispatch } from 'react-redux';
import { fetchAllGames } from '../../../../redux/action-creators';
import { SportHubSlug } from '../../../../constants/sports';
import { useLocation, useParams } from 'react-router';
import { getGame } from '../../../../helpers/redux';
import { Game } from '../../../../constants/matches';

const MatchPage = () => {
  const [value, setValue] = useState<number>(0);
  const location = useLocation();
  const { sportHub, gameId } = useParams();

  const { chain } = useNetwork();
  const dispatch = useDispatch();

  const { data, loading } = useTypedSelector((state) => state.games);

  const getSportHubSlugs = useCallback(() => {
    if (sportHub === 'sports') return [SportHubSlug.sports];
    else return [SportHubSlug.esports];
  }, [location]);

  useEffect(() => {
    if (data.length === 0) fetchAllGames(chain?.id || polygon.id, getSportHubSlugs())(dispatch);
  }, [chain, getSportHubSlugs, dispatch]);

  return (
    <Layout>
      <MatchHeader value={value} setValue={setValue} />
      {value === 0 && (
        <AllMatchOdds game={!loading ? (getGame(gameId as string) as unknown as Game) : null} />
      )}
    </Layout>
  );
};

export default MatchPage;
