import { SportHubSlug, SportSlug } from '../../constants/sports';
import { ActionType } from '../action-types';
import { GamesAction } from '../actions';

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
  loading: boolean;
  error: string | null;
  data: AzuroGame[];
}

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const reducer = (state: GamesState = initialState, action: GamesAction): GamesState => {
  switch (action.type) {
    case ActionType.FETCH_GAMES_START:
      return {
        loading: true,
        error: null,
        data: [],
      };
    case ActionType.FETCH_GAMES_SUCCESSS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };

    case ActionType.FETCH_GAMES_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: [],
      };

    default:
      return state;
  }
};

export default reducer;
