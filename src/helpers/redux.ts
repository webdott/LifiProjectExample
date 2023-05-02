import { store } from '../redux';
import { aggregateOutcomesByMarkets } from '@azuro-org/toolkit';
import { AzuroGame } from '../redux/reducers/games';
import { GAMES_ORDER } from '../constants/games';
import { orderBy } from 'lodash';
import dayjs from 'dayjs';
import germanyFlag from '../public/images/leaguesFlags/germany.webp';
import { MatchesEnum } from '../constants/matches';
import { SPORTS_HUB_MAP, SPORTS_ICONS, SPORTS_NAMES, SportHubSlug } from '../constants/sports';

const _generateInitialGame = (game: AzuroGame) => {
  const markets = aggregateOutcomesByMarkets({
    lpAddress: game.liquidityPool.address,
    conditions: game.conditions.map((item) => ({ ...item, coreAddress: item.core.address })),
  });
  const startsAt = dayjs(parseInt(game.startsAt, 10) * 1000);
  const now = dayjs();
  return {
    id: game.id,
    team1: game.title.split('-')[0].trim(),
    team2: (game.title.split('-')[1] || '').trim(),
    timeLabel:
      startsAt.format('YYYY-MM-DD') === now.format('YYYY-MM-DD')
        ? MatchesEnum.TODAY
        : startsAt.format('YYYY-MM-DD') === now.add(1, 'd').format('YYYY-MM-DD')
        ? MatchesEnum.TOMORROW
        : MatchesEnum.ALL,
    startsAtString: startsAt.format('HH:mm'),
    startsAt: startsAt,
    markets: markets,
  };
};

const _generateInitialLeague = (game: AzuroGame) => {
  return {
    slug: game.league.slug,
    name: game.league.name,
    flag: germanyFlag,
    games: [_generateInitialGame(game)],
  };
};
const _generateInitialSport = (game: AzuroGame) => {
  return {
    ...SPORTS_ICONS[game.sport.slug],
    sport: game.sport.name,
    sportSlug: game.sport.slug,
    sportHub: game.sport.sporthub.name,
    leagues: {
      [game.league.slug]: _generateInitialLeague(game),
    },
  };
};

export const getGamesByLeageus = (hubSlugs: SportHubSlug[]) => {
  const games = store.getState().games.data;
  if (games.length === 0) return [];
  const gamesByLeague: any = {};
  games.forEach((g) => {
    if (!(g.sport.slug in gamesByLeague)) {
      gamesByLeague[g.sport.slug] = _generateInitialSport(g);
    } else {
      const sport = gamesByLeague[g.sport.slug];
      if (!(g.league.slug in sport.leagues)) {
        sport.leagues[g.league.slug] = _generateInitialLeague(g);
      } else {
        sport.leagues[g.league.slug].games.push(_generateInitialGame(g));
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
