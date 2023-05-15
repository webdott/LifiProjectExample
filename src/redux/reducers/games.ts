import { SportHubSlug, SportSlug } from '../../constants/sports';
import { ActionType } from '../action-types';
import {
  CurrentGameAction,
  FeaturedGamesAction,
  GamesAction,
  SetCurrentSlugAction,
} from '../actions';
import { ResetCurrentSlugsAction } from '../actions/interfaces';
import { AzuroSport } from './sports';

export type AzuroStatus = 'Resolved' | 'Canceled' | 'Created';

export type AzuroSportHub = {
  name: string;
  slug: SportHubSlug;
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
  games: { id: string }[];
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
    data: { [key: string]: AzuroGame };
  };
  featured: {
    loading: boolean;
    error: string | null;
    data: AzuroGame[];
  };
  currentGame: {
    loading: boolean;
    error: string | null;
    data: AzuroGame | null;
  };
  currentSportSlug: SportSlug | null;
  currentLeagueSlug: string | null;
  currentCountrySlug: string | null;
}

const initialState = {
  initialLoad: false,
  list: {
    loading: false,
    error: null,
    data: {},
  },
  featured: {
    loading: false,
    error: null,
    data: [],
  },
  currentGame: {
    loading: false,
    error: null,
    data: null,
  },
  currentSportSlug: null,
  currentLeagueSlug: null,
  currentCountrySlug: null,
};

const reducer = (
  state: GamesState = initialState,
  action:
    | GamesAction
    | FeaturedGamesAction
    | CurrentGameAction
    | SetCurrentSlugAction
    | ResetCurrentSlugsAction
): GamesState => {
  switch (action.type) {
    case ActionType.FETCH_GAMES_START:
      return {
        ...state,
        initialLoad: true,
        list: {
          loading: true,
          error: null,
          data: {},
        },
      };
    case ActionType.FETCH_GAMES_SUCCESS:
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
          data: {},
        },
      };
    case ActionType.FETCH_FEATURED_GAMES_START:
      return {
        ...state,
        initialLoad: true,
        featured: {
          loading: true,
          error: null,
          data: [],
        },
      };
    case ActionType.FETCH_FEATURED_GAMES_SUCCESS:
      return {
        ...state,
        featured: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };

    case ActionType.FETCH_FEATURED_GAMES_ERROR:
      return {
        ...state,
        featured: {
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
    case ActionType.FETCH_CURRENT_GAME_SUCCESS:
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
    case ActionType.SET_CURRENT_SPORT_SLUG:
      return {
        ...state,
        currentSportSlug: action.payload,
      };
    case ActionType.SET_CURRENT_LEAGUE_SLUG:
      return {
        ...state,
        currentLeagueSlug: action.payload,
      };
    case ActionType.SET_CURRENT_COUNTRY_SLUG:
      return {
        ...state,
        currentCountrySlug: action.payload,
      };
    case ActionType.RESET_CURRENT_SLUGS:
      return {
        ...state,
        currentSportSlug: null,
        currentLeagueSlug: null,
        currentCountrySlug: null,
      };

    default:
      return state;
  }
};

export default reducer;
