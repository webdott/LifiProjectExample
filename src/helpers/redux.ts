import { store } from '../redux';
import { aggregateOutcomesByMarkets } from '@azuro-org/toolkit';
import { AzuroGame } from '../redux/reducers/games';
import _ from 'lodash';
import { GAMES_ORDER } from '../constants/games';
import { orderBy } from 'lodash';
import dayjs from 'dayjs';
import { Game, League, MatchesEnum, Sport } from '../constants/matches';
import {
  SPORTS_HUB_MAP,
  SPORTS_ICONS,
  SPORTS_NAMES,
  SPORT_HUB_NAMES,
  SportHubSlug,
} from '../constants/sports';
import { getMarketDescription, getMarketKey } from '@azuro-org/dictionaries';
import { AzuroSport } from '../redux/reducers/sports';

const generateGameObj = (game: AzuroGame): Game => {
  let markets = aggregateOutcomesByMarkets({
    lpAddress: game.liquidityPool.address,
    conditions: game.conditions.map((item) => ({ ...item, coreAddress: item.core.address })),
  });

  const fmtMarkets = markets.map((m) => {
    const marketId = getMarketKey(m.outcomes[0][0].outcomeId);
    return {
      ...m,
      marketDescription: getMarketDescription({
        marketKey: marketId,
        outcomeId: m.outcomes[0][0].outcomeId,
      }),
    };
  });
  const startsAt = dayjs(parseInt(game.startsAt, 10) * 1000);
  const now = dayjs();
  return {
    id: game.id,
    gameId: game.gameId,
    participant1: game.participants[0],
    participant2: game.participants[1],
    league: {
      name: game.league.name,
      country: {
        name: game.league.country.name,
        slug: game.league.country.slug,
      },
    },
    timeLabel:
      startsAt.format('YYYY-MM-DD') === now.format('YYYY-MM-DD')
        ? MatchesEnum.TODAY
        : startsAt.format('YYYY-MM-DD') === now.add(1, 'd').format('YYYY-MM-DD')
        ? MatchesEnum.TOMORROW
        : MatchesEnum.ALL,
    startsAtString: startsAt.format('HH:mm'),
    startsAt: startsAt,
    markets: fmtMarkets,
  };
};

export const getSportsWithGames = (hubSlugs: SportHubSlug[]): Sport[] => {
  const sports: AzuroSport[] = JSON.parse(JSON.stringify(store.getState().sports.list.data));
  const games = store.getState().games.list.data;

  const sportsData: Sport[] = sports.map((sp) => ({
    ...sp,
    leagues:
      sp.leagues?.map((lg) => ({
        ...lg,
        games:
          (lg.games
            ?.map((g) => (games[g.id] ? generateGameObj(games[g.id]) : null))
            .filter((g) => g) as Game[]) || [],
      })) || [],
  }));

  const sportsBySlug = _.keyBy(sportsData, 'slug');
  // Process results to order sports and leagues
  const result: any[] = [];
  hubSlugs.forEach((sph) => {
    GAMES_ORDER[sph].forEach((game) => {
      const sportHubSlug = SPORTS_HUB_MAP.esports.includes(game)
        ? SportHubSlug.esports
        : SportHubSlug.sports;
      const sportData = sportsBySlug[game] || {
        name: SPORTS_NAMES[game],
        slug: game,
        sporthub: {
          slug: sportHubSlug,
          name: SPORT_HUB_NAMES[sportHubSlug],
        },
        leagues: [],
      };
      sportData.leagues = orderBy(Object.values(sportData.leagues), (i: any) => i.games.length, [
        'desc',
      ]);
      sportData.leagues.forEach((item: any) => {
        item.games = orderBy(item.games, 'startAt');
      });

      result.push(sportData);
    });
  });

  return result;
};

export const getCurrentGame = (): Game | null => {
  const game = store.getState().games.currentGame.data;
  if (!game) return null;

  return generateGameObj(game);
};

export const getOrderedSports = (hubSlugs: SportHubSlug[]): Sport[] => {
  const sports = JSON.parse(JSON.stringify(store.getState().sports.list.data));
  const sportsBySlug = _.keyBy(sports, 'slug');
  // Process results to order sports and leagues
  const result: any[] = [];
  hubSlugs.forEach((sph) => {
    GAMES_ORDER[sph].forEach((game) => {
      const sportHubSlug = SPORTS_HUB_MAP.esports.includes(game)
        ? SportHubSlug.esports
        : SportHubSlug.sports;
      const sportData = sportsBySlug[game] || {
        name: SPORTS_NAMES[game],
        slug: game,
        sporthub: {
          slug: sportHubSlug,
          name: SPORT_HUB_NAMES[sportHubSlug],
        },
        leagues: [],
      };
      sportData.leagues = orderBy(Object.values(sportData.leagues), (i: any) => i.games.length, [
        'desc',
      ]);
      sportData.leagues.forEach((item: any) => {
        item.games = orderBy(item.games, 'startAt');
      });

      result.push(sportData);
    });
  });

  return result;
};
