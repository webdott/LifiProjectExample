import { ActionType } from '../action-types';
import { AppAction } from '../actions';

export enum OddsFormat {
  eu = 'EU',
  us = 'US',
  uk = 'UK',
}

interface AppState {
  oddsFormat: OddsFormat;
  slippageTolerance: number;
  quickBetOptions: number[];
}

const initialState = {
  oddsFormat: OddsFormat.eu,
  slippageTolerance: 3,
  quickBetOptions: [10, 50, 70],
};

const reducer = (state: AppState = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case ActionType.UPDATE_ODDS_FORMAT:
      return {
        ...state,
        oddsFormat: action.payload || OddsFormat.eu,
      };
    case ActionType.UPDATE_SLIPPAGE_TOLERANCE:
      return {
        ...state,
        slippageTolerance: action.payload,
      };
    case ActionType.UPDATE_QUICK_BET_OPTIONS:
      return {
        ...state,
        quickBetOptions: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
