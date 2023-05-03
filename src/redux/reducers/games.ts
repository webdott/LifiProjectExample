import { SportHubSlug, SportSlug } from '../../constants/sports';
import { ActionType } from '../action-types';
import { CurrentGameAction, GamesAction } from '../actions';

export type AzuroStatus = 'Resolved' | 'Canceled' | 'Created';

export type AzureSportHub = {
  name: string;
  slug: SportHubSlug;
};
export type AzuroSport = {
  sportId: string;
  name: string;
  slug: SportSlug;
  sporthub: AzureSportHub;
};

export type AzuroCountry = {
  name: string;
  slug: string;
  turnover: string;
};

export type AzuroLeague = {
  name: string;
  slug: string;
  country: AzuroCountry;
};

export type AzuroParticipant = {
  image: string | null;
  name: string;
};

export type AzuroOutcome = {
  id: string;
  outcomeId: string;
  odds: number;
};

export type AzuroCondition = {
  id: string;
  conditionId: string;
  status: AzuroStatus;
  outcomes: AzuroOutcome[];
  core: {
    address: string;
    type: string;
  };
};

export type AzuroGame = {
  id: string;
  gameId: string;
  slug: SportSlug;
  title: string;
  status: AzuroStatus;
  sport: AzuroSport;
  league: AzuroLeague;
  participants: AzuroParticipant[];
  startsAt: string;
  hasActiveConditions: boolean;
  liquidityPool: {
    address: string;
  };
  conditions: AzuroCondition[];
};

interface GamesState {
  initialLoad: boolean;
  list: {
    loading: boolean;
    error: string | null;
    data: AzuroGame[];
  };
  currentGame: {
    loading: boolean;
    error: string | null;
    data: AzuroGame | null;
  };
}

const initialState = {
  initialLoad: false,
  list: {
    loading: false,
    error: null,
    data: [],
  },
  currentGame: {
    loading: false,
    error: null,
    data: null,
  },
};

const reducer = (
  state: GamesState = initialState,
  action: GamesAction | CurrentGameAction
): GamesState => {
  switch (action.type) {
    case ActionType.FETCH_GAMES_START:
      return {
        ...state,
        initialLoad: true,
        list: {
          loading: true,
          error: null,
          data: [],
        },
      };
    case ActionType.FETCH_GAMES_SUCCESSS:
      return {
        ...state,
        list: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };

    case ActionType.FETCH_GAMES_ERROR:
      return {
        ...state,
        list: {
          loading: false,
          error: action.payload,
          data: [],
        },
      };
    case ActionType.FETCH_CURRENT_GAME_START:
      return {
        ...state,
        currentGame: {
          loading: true,
          error: null,
          data: null,
        },
      };
    case ActionType.FETCH_CURRENT_GAME_SUCCESSS:
      return {
        ...state,
        currentGame: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };

    case ActionType.FETCH_CURRENT_GAME_ERROR:
      return {
        ...state,
        currentGame: {
          loading: false,
          error: action.payload,
          data: null,
        },
      };

    default:
      return state;
  }
};

export default reducer;
