import { ActionType } from '../action-types';
import { AppAction } from '../actions';

export enum OddsFormat {
  eu = 'EU',
  us = 'US',
  uk = 'UK',
}

interface AppState {
  oddsFormat: OddsFormat;
}

const initialState = {
  oddsFormat: OddsFormat.eu,
};

const reducer = (state: AppState = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case ActionType.UPDATE_ODDS_FORMAT:
      return {
        oddsFormat: action.payload || OddsFormat.eu,
      };
    default:
      return state;
  }
};

export default reducer;
