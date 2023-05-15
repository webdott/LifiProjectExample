import { Dispatch } from 'redux';
import axios from 'axios';
import _ from 'lodash';
import dayjs from 'dayjs';
import { ActionType } from '../action-types';
import {
  GamesAction,
  BetSlipAction,
  GPXButtonsAction,
  BestHistoryAction,
  AppAction,
  CurrentGameAction,
  SportsAction,
  FeaturedGamesAction,
} from '../actions';
import { CurrentGame } from '../reducers/betSlip';
import { GRAPHQL_URLS, LIQUIDITY_POOLS } from '../../constants/azuro';
import { SportHubSlug, SportSlug } from '../../constants/sports';
import { OddsFormat } from '../reducers/app';
import { SetCurrentCountrySlugAction, SetCurrentSportSlugAction } from '../actions/interfaces';
import { SetCurrentLeagueSlugAction } from '../actions/interfaces';
import { store } from '../store';
import { AzuroSport } from '../reducers/sports';
const PAGE_SIZE = 10;

const SPORTS_QUERY = `
  query Sports($sportFilter: Sport_filter, $countryFilter: Country_filter, $leagueFilter: League_filter, $gameFilter: Game_filter, $gameOrderBy: Game_orderBy, $gameOrderDirection: OrderDirection) {
    sports(where: $sportFilter, subgraphError: allow) {
      sportId
      name
      slug
      sporthub {
        name
        slug
        __typename
      }
      countries(where: $countryFilter, orderBy: turnover, orderDirection: desc) {
        leagues(where: $leagueFilter, orderBy: turnover, orderDirection: desc) {
          name
          slug
          country {
            name
            slug
            turnover
          }
          games(
            where: $gameFilter
            orderBy: $gameOrderBy
            orderDirection: $gameOrderDirection
          ) {
            id
            __typename

          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;

const GAMES_QUERY = `
  query Games($first: Int, $gamesFilter: Game_filter, $orderBy: Game_orderBy, $orderDirection: OrderDirection) {
    games(first: $first, where: $gamesFilter, subgraphError: allow, orderBy: $orderBy, orderByDirection: $orderDirection ) {
      ...Game
      conditions {
        ...GameCondition
        __typename
      }
      __typename
    }
  }

  fragment Game on Game {
    id
    gameId
    slug
    title
    status
    turnover
    sport {
      sportId
      name
      slug
      sporthub {
        name
        slug
        __typename
      }
      __typename
    }
    league {
      name
      slug
      country {
        name
        slug
        turnover
        __typename
      }
      __typename
    }
    participants {
      image
      name
      __typename
    }
    startsAt
    hasActiveConditions
    liquidityPool {
      address
      __typename
    }
    __typename
  }

  fragment GameCondition on Condition {
    id
    conditionId
    status
    outcomes {
      id
      outcomeId
      odds
      __typename
    }
    core {
      address
      type
      __typename
    }
    __typename
  }
`;

const CURRENT_GAMES_QUERY = `
  query Games($gameFilter: Game_filter) {
    games(where: $gameFilter) {
      ...Game
      conditions {
        ...GameCondition
        __typename
      }
      __typename
    }
  }

  fragment Game on Game {
    id
    gameId
    slug
    title
    status
    sport {
      sportId
      name
      slug
      sporthub {
        name
        slug
        __typename
      }
      __typename
    }
    league {
      name
      slug
      country {
        name
        slug
        turnover
        __typename
      }
      __typename
    }
    participants {
      image
      name
      __typename
    }
    startsAt
    hasActiveConditions
    liquidityPool {
      address
      __typename
    }
    __typename
  }

  fragment GameCondition on Condition {
    id
    conditionId
    status
    outcomes {
      id
      outcomeId
      odds
      __typename
    }
    core {
      address
      type
      __typename
    }
    __typename
  }
`;

const BETS_HISTORY_QUERY = `
  query BetsHistory($first: Int, $skip: Int,  $where: Bet_filter) {
  bets(first: $first, skip: $skip where: $where, orderBy: createdBlockTimestamp, orderByDirection: desc) {
    betId 
    amount 
    potentialPayout 
    status 
    result 
    isRedeemable 
    isRedeemed 
    createdBlockTimestamp 
    createdTxHash 
    outcome { 
      outcomeId
      odds
    }
    game { 
      ...Game
    }
  }
}
 
fragment Game on Game {
  sport {
    name
  }
  league {
    name
    country {
      name
    }
  }
  participants {
    name
    image
  }
  startsAt
}
`;

export const fetchSports = ({
  chainId,
  hubSlugs,
}: {
  chainId: number;
  hubSlugs: SportHubSlug[];
}) => {
  return async (dispatch: Dispatch<SportsAction>) => {
    dispatch({
      type: ActionType.FETCH_SPORTS_START,
    });

    const now = dayjs();
    const tsNow = now.unix().toString();
    const tomorrowEnd = now.add(1, 'd').endOf('d').unix().toString();
    let operation = 'Sports';
    try {
      const { data: sportsData } = await axios.post(GRAPHQL_URLS[chainId] + `?op=${operation}`, {
        operation,
        query: SPORTS_QUERY,
        variables: {
          sportFilter: {
            sporthub_in: hubSlugs,
          },
          countryFilter: {
            hasActiveLeagues: true,
          },
          leagueFilter: {
            games_: {
              startsAt_gt: tsNow,
              startsAt_lt: tomorrowEnd,
              hasActiveConditions: true,
              liquidityPool: LIQUIDITY_POOLS[chainId],
            },
          },
          gameFilter: {
            startsAt_gt: tsNow,
            startsAt_lt: tomorrowEnd,
            hasActiveConditions: true,
            liquidityPool: LIQUIDITY_POOLS[chainId],
          },
          gameOrderBy: 'turnover',
          gameOrderDirection: 'desc',
        },
      });

      const fmtData = sportsData.data.sports.map((item: any) => ({
        ...item,
        leagues: item.countries.map((c: any) => c.leagues).flat(),
      }));
      dispatch({
        type: ActionType.FETCH_SPORTS_SUCCESS,
        payload: fmtData,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.FETCH_SPORTS_ERROR,
        payload: err.message,
      });
    }
  };
};

export const fetchFeaturedGames = ({ chainId }: { chainId: number }) => {
  return async (dispatch: Dispatch<FeaturedGamesAction>) => {
    const sportsData: AzuroSport[] = JSON.parse(JSON.stringify(store.getState().sports.list.data));
    if (sportsData.length === 0) return;
    dispatch({
      type: ActionType.FETCH_FEATURED_GAMES_START,
    });

    try {
      const gameIds: string[] = [];

      sportsData.forEach((sp) => {
        sp.leagues.forEach((lg) => {
          gameIds.push(...(lg.games?.map((g) => g.id) || []));
        });
      });

      const operation = 'FeaturedGames';
      const { data: gamesData } = await axios.post(GRAPHQL_URLS[chainId] + `?op=${operation}`, {
        operation,
        query: GAMES_QUERY,
        variables: {
          first: 10,
          orderBy: 'turnover',
          orderDirection: 'desc',
          gamesFilter: {
            id_in: gameIds,
          },
        },
      });
      dispatch({
        type: ActionType.FETCH_FEATURED_GAMES_SUCCESS,
        payload: gamesData.data.games,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.FETCH_FEATURED_GAMES_ERROR,
        payload: err.message,
      });
    }
  };
};

export const fetchGames = ({
  chainId,
  sportSlug = null,
  leagueSlug = null,
  countrySlug = null,
}: {
  chainId: number;
  sportSlug?: SportSlug | null;
  leagueSlug?: string | null;
  countrySlug?: string | null;
}) => {
  return async (dispatch: Dispatch<GamesAction>) => {
    const sportsData: AzuroSport[] = JSON.parse(JSON.stringify(store.getState().sports.list.data));
    if (sportsData.length === 0) return;
    dispatch({
      type: ActionType.FETCH_GAMES_START,
    });

    try {
      const gameIds: string[] = [];

      sportsData
        .filter((sp) => !sportSlug || sp.slug === sportSlug)
        .forEach((sp) => {
          sp.leagues
            ?.filter(
              (lg) =>
                (!leagueSlug || lg.slug === leagueSlug) &&
                (!countrySlug || lg.country.slug === countrySlug)
            )
            .forEach((lg) => {
              gameIds.push(...(lg.games?.map((g) => g.id) || []));
            });
        });

      const operation = 'Games';
      const { data: gamesData } = await axios.post(GRAPHQL_URLS[chainId] + `?op=${operation}`, {
        operation,
        query: GAMES_QUERY,
        variables: {
          first: 1000,
          orderBy: 'startsAt',
          orderDirection: 'asc',
          gamesFilter: {
            id_in: gameIds,
          },
        },
      });
      dispatch({
        type: ActionType.FETCH_GAMES_SUCCESS,
        payload: _.keyBy(gamesData.data.games, 'id'),
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.FETCH_GAMES_ERROR,
        payload: err.message,
      });
    }
  };
};

export const fetchBetsHistory = (
  chainId: number,
  accountId: string,
  {
    extraFilters,
    page = 1,
  }: {
    extraFilters?: { [key: string]: any };
    page?: number;
  }
) => {
  return async (dispatch: Dispatch<BestHistoryAction>) => {
    dispatch({
      type: ActionType.FETCH_BETS_HISTORY_START,
    });

    let operation = 'BetsHistory';
    try {
      const { data: betsHistory } = await axios.post(GRAPHQL_URLS[chainId] + `?op=${operation}`, {
        operation,
        query: BETS_HISTORY_QUERY,
        variables: {
          skip: (page - 1) * PAGE_SIZE,
          first: PAGE_SIZE,
          where: {
            actor: accountId,
            // for testing purposes
            // actor: '0xa416b49c0e513ffdd25198f709ccb553256642dc',
            ...extraFilters,
          },
        },
      });

      dispatch({
        type: ActionType.FETCH_BETS_HISTORY_SUCCESS,
        payload: betsHistory.data.bets,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.FETCH_BETS_HISTORY_ERROR,
        payload: err.message,
      });
    }
  };
};

export const getGpxButtonState = (indexNumber: number) => {
  return async (dispatch: Dispatch<GPXButtonsAction>) => {
    dispatch({
      type: ActionType.GET_BUTTON_STATE_START,
    });

    if (indexNumber) {
      dispatch({
        type: ActionType.GET_BUTTON_STATE_SUCCESS,
        payload: indexNumber,
      });
    } else {
      dispatch({
        type: ActionType.GET_BUTTON_STATE_ERROR,
        payload: 'Invalid Index Number',
      });
    }
  };
};

export const addBetSlip = (game: CurrentGame) => {
  return (dispatch: Dispatch<BetSlipAction>) => {
    dispatch({
      type: ActionType.ADD_BET_SLIP,
      payload: game,
    });
  };
};

export const removeBetSlip = () => {
  return (dispatch: Dispatch<BetSlipAction>) => {
    dispatch({
      type: ActionType.REMOVE_BET_SLIP,
    });
  };
};

export const updateOddsFormat = (format: OddsFormat) => {
  return (dispatch: Dispatch<AppAction>) => {
    dispatch({
      type: ActionType.UPDATE_ODDS_FORMAT,
      payload: format,
    });
  };
};

export const fetchCurrentGame = (chainId: number, gameId: string) => {
  return async (dispatch: Dispatch<CurrentGameAction>) => {
    dispatch({
      type: ActionType.FETCH_CURRENT_GAME_START,
    });

    let operation = 'CurrentGame';
    try {
      const { data: games } = await axios.post(GRAPHQL_URLS[chainId] + `?op=${operation}`, {
        operation,
        query: CURRENT_GAMES_QUERY,
        variables: {
          gameFilter: {
            gameId: gameId,
          },
        },
      });

      dispatch({
        type: ActionType.FETCH_CURRENT_GAME_SUCCESS,
        payload: games.data.games[0] || null,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.FETCH_CURRENT_GAME_ERROR,
        payload: err.message,
      });
    }
  };
};

export const setCurrentSportSlug = (slug: SportSlug | null) => {
  return async (dispatch: Dispatch<SetCurrentSportSlugAction>) => {
    dispatch({
      type: ActionType.SET_CURRENT_SPORT_SLUG,
      payload: slug,
    });
  };
};

export const setCurrentLeagueSlug = (slug: string | null) => {
  return async (dispatch: Dispatch<SetCurrentLeagueSlugAction>) => {
    dispatch({
      type: ActionType.SET_CURRENT_LEAGUE_SLUG,
      payload: slug,
    });
  };
};

export const setCurrentCountrySlug = (slug: string | null) => {
  return async (dispatch: Dispatch<SetCurrentCountrySlugAction>) => {
    dispatch({
      type: ActionType.SET_CURRENT_COUNTRY_SLUG,
      payload: slug,
    });
  };
};
