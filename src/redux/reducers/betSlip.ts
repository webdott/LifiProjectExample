import { SportSlug } from '../../constants/sports';
import { ActionType } from '../action-types';
import { BetSlipAction } from '../actions';

export interface CurrentGame {
  id: string;
  sportSlug: SportSlug;
  team1: string;
  team2: string;
  betType: string;
  matchOdd: {
    id: number;
    odds: string;
    selectionName: string;
  };
}

interface BetSlipState {
  currentGame: CurrentGame | null;
}

const initialState = {
  currentGame: null,
};

const reducer = (state: BetSlipState = initialState, action: BetSlipAction): BetSlipState => {
  switch (action.type) {
    case ActionType.ADD_BET_SLIP:
      return {
        currentGame: action?.payload ?? null,
      };

    case ActionType.REMOVE_BET_SLIP:
      return {
        currentGame: null,
      };

    default:
      return state;
  }
};

export default reducer;
