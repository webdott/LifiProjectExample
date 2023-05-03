import { SportSlug } from '../../constants/sports';
import { ActionType } from '../action-types';
import { BestHistoryAction } from '../actions';
import {
  AzuroCondition,
  AzuroOutcome,
  AzuroSport,
  AzuroStatus,
  AzuroLeague,
  AzuroParticipant,
} from './games';

export enum BetsResult {
  won = 'Won',
  lose = 'Lose',
}

export type AzuroBet = {
  betId: string;
  amount: number;
  potentialPayout: number;
  status: AzuroStatus;
  result: BetsResult;
  isRedeemable: boolean;
  isRedeemed: boolean;
  createdBlockTimestamp: number;
  createdTxHash: boolean;
  outcome: AzuroOutcome;
  game: AzuroGame;
};

export type AzuroGame = {
  id: string;
  gameId: string;
  slug: SportSlug;
  title: string;
  AzuroOutcome: AzuroStatus;
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

interface BetsHistoryState {
  loading: boolean;
  error: string | null;
  data: AzuroBet[];
}

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const reducer = (
  state: BetsHistoryState = initialState,
  action: BestHistoryAction
): BetsHistoryState => {
  switch (action.type) {
    case ActionType.FETCH_BETS_HISTORY_START:
      return {
        loading: true,
        error: null,
        data: [],
      };
    case ActionType.FETCH_BETS_HISTORY_SUCCESSS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };

    case ActionType.FETCH_BETS_HISTORY_ERROR:
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
