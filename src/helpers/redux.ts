import { store } from '../redux';
import { aggregateOutcomesByMarkets } from '@azuro-org/toolkit';
import { AzuroGame } from '../redux/reducers/games';
import { GAMES_ORDER } from '../constants/games';
import { orderBy } from 'lodash';
import dayjs from 'dayjs';
import { Game, League, MatchesEnum, Sport } from '../constants/matches';
import { SPORTS_HUB_MAP, SPORTS_ICONS, SPORTS_NAMES, SportHubSlug } from '../constants/sports';
import { getMarketDescription, getMarketKey } from '@azuro-org/dictionaries';

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
    startsAtString: startsAt.format('HH-mm'),
    startsAt: startsAt,
    markets: fmtMarkets,
  };
};

const _generateLeagueObject = (game: AzuroGame): League => {
  return {
    slug: game.league.slug,
    name: game.league.name,
    country: {
      name: game.league.country.name,
      slug: game.league.country.slug,
    },
    games: [generateGameObj(game)],
  };
};
const _generateSportObj = (game: AzuroGame) => {
  return {
    ...SPORTS_ICONS[game.sport.slug],
    sport: game.sport.name,
    sportSlug: game.sport.slug,
    sportHub: game.sport.sporthub.name,
    leagues: {
      [game.league.slug]: _generateLeagueObject(game),
    },
  };
};

export const getGamesByLeageus = (hubSlugs: SportHubSlug[]): Sport[] => {
  const games = store.getState().games.data;
  if (games.length === 0) return [];
  const gamesByLeague: any = {};
  games.forEach((g) => {
    if (!(g.sport.slug in gamesByLeague)) {
      gamesByLeague[g.sport.slug] = _generateSportObj(g);
    } else {
      const sport = gamesByLeague[g.sport.slug];
      if (!(g.league.slug in sport.leagues)) {
        sport.leagues[g.league.slug] = _generateLeagueObject(g);
      } else {
        sport.leagues[g.league.slug].games.push(generateGameObj(g));
      }
    }
  });
  // Process results to order sports and leagues
  const result: any[] = [];
  hubSlugs.forEach((sph) => {
    GAMES_ORDER[sph].forEach((game) => {
      const sportData = gamesByLeague[game] || {
        ...SPORTS_ICONS[game],
        sport: SPORTS_NAMES[game],
        sportSlug: game,
        sportHub: SPORTS_HUB_MAP.esports.includes(game)
          ? SportHubSlug.esports
          : SportHubSlug.sports,
        leagues: [],
      };
      sportData.leagues = orderBy(Object.values(sportData.leagues), (i: any) => i.games.length, [
        'asc',
      ]);
      sportData.leagues.forEach((item: any) => {
        item.games = orderBy(item.games, 'startAt');
      });

      result.push(sportData);
    });
  });

  return result;
};

export const getGame = (id: string): Game | null => {
  const games = store.getState().games.data;

  const index = games.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const result = games[index];
  return generateGameObj(result);
};
