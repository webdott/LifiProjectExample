import { ActionType } from '../action-types';
import { Action } from '../actions';

export type AzuraStatus = 'Resolved' | 'Canceled' | 'Created';

export type AzureSportHub = {
  slug: string;
};
export type AzureSport = {
  sportId: string;
  name: string;
  slug: string;
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

export type AzuerOutcome = {
  id: string;
  outcomeId: string;
  odds: string;
};

export type AzuerCondition = {
  id: string;
  conditionId: string;
  status: AzuraStatus;
  outcomes: AzuerOutcome[];
  core: {
    address: string;
    type: string;
  };
};

export type AzuroGame = {
  id: string;
  gameId: string;
  slug: string;
  title: string;
  status: AzuraStatus;
  sport: AzureSport;
  league: AzuroLeague;
  participants: AzuroParticipant[];
  startsAt: string;
  hasActiveConditions: boolean;
  liquidityPool: {
    address: string;
  };
  conditions: AzuerCondition[];
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

const reducer = (state: GamesState = initialState, action: Action): GamesState => {
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
