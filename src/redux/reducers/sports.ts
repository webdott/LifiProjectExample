import { SportSlug } from '../../constants/sports';
import { ActionType } from '../action-types';
import { SportsAction } from '../actions';
import { AzuroSportHub, AzuroLeague } from '../reducers/games';

export type AzuroSport = {
  sportId: string;
  name: string;
  slug: SportSlug;
  sporthub: AzuroSportHub;
  leagues: AzuroLeague[];
};

interface SportsState {
  list: {
    loading: boolean;
    error: string | null;
    data: AzuroSport[];
  };
}

const initialState: SportsState = {
  list: {
    loading: false,
    error: null,
    data: [],
  },
};

const reducer = (state: SportsState = initialState, action: SportsAction): SportsState => {
  switch (action.type) {
    case ActionType.FETCH_SPORTS_START:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      };
    case ActionType.FETCH_SPORTS_SUCCESS: {
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          data: action.payload,
        },
      };
    }
    case ActionType.FETCH_SPORTS_ERROR:
      return {
        ...state,
        list: {
          ...state.list,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;
