import { Dispatch } from 'redux';
import axios from 'axios';
import dayjs from 'dayjs';
import { ActionType } from '../action-types';
import {
  GamesAction,
  BetSlipAction,
  GPXButtonsAction,
  BestHistoryAction,
  AppAction,
  CurrentGameAction,
} from '../actions';
import { CurrentGame } from '../reducers/betSlip';
import { GRAPHQL_URLS, LIQUIDITY_POOLS } from '../../constants/azuro';
import { SPORTS_HUB_MAP, SportHubSlug } from '../../constants/sports';
import { OddsFormat } from '../reducers/app';
const PAGE_SIZE = 10;

const SPORTS_QUERY = `
  query Sports($sportFilter: Sport_filter, $countryFilter: Country_filter, $leagueFilter: League_filter, $gameFilter: Game_filter, $gameOrderBy: Game_orderBy, $gameOrderDirection: OrderDirection) {
    sports(where: $sportFilter, subgraphError: allow) {
      countries(where: $countryFilter, orderBy: turnover, orderDirection: desc) {
        leagues(where: $leagueFilter, orderBy: turnover, orderDirection: desc) {
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
      name
      sporthub {name}
    }
  }
`;

const GAMES_QUERY = `
  query Games($first: Int, $gamesFilter: Game_filter) {
    games(first: $first, where: $gamesFilter, subgraphError: allow) {
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
  query BetsHistory($first: Int, $skip: Int, $where: Bet_filter) {
  bets(first: $first, skip: $skip where: $where) {
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

export const fetchAllGames = (chainId: number, hubSlugs: SportHubSlug[]) => {
  return async (dispatch: Dispatch<GamesAction>) => {
    dispatch({
      type: ActionType.FETCH_GAMES_START,
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
            slug_in: hubSlugs.map((i) => SPORTS_HUB_MAP[i]).flat(),
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

      const gameIds: number[] = [];

      sportsData.data.sports.forEach((sp: any) => {
        sp.countries.forEach((c: any) => {
          c.leagues.forEach((lg: any) => {
            gameIds.push(...lg.games.map((g: any) => g.id));
          });
        });
      });

      operation = 'Games';
      const { data: gamesData } = await axios.post(GRAPHQL_URLS[chainId] + `?op=${operation}`, {
        operation,
        query: GAMES_QUERY,
        variables: {
          first: 1000,
          gamesFilter: {
            id_in: gameIds,
          },
        },
      });
      dispatch({
        type: ActionType.FETCH_GAMES_SUCCESSS,
        payload: gamesData.data.games,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.FETCH_GAMES_ERROR,
        payload: err.message,
      });
    }
  };
};

export const fetchBetsHistory = (chainId: number, page: number = 2) => {
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
            actor: '0xa416b49c0e513ffdd25198f709ccb553256642dc',
          },
        },
      });

      dispatch({
        type: ActionType.FETCH_BETS_HISTORY_SUCCESSS,
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
        type: ActionType.FETCH_CURRENT_GAME_SUCCESSS,
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
