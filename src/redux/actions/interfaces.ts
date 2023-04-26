import { CurrentGame } from '../reducers/betSlip';
import { ActionType } from './../action-types';

export interface FetchGamesAction {
  type: ActionType.FETCH_GAMES_START;
}

export interface FetchGamesSuccessAction {
  type: ActionType.FETCH_GAMES_SUCCESSS;
  payload: any[];
}

export interface FecthGamesErrorAction {
  type: ActionType.FETCH_GAMES_ERROR;
  payload: string;
}

// GPX BUTTON STATES HANDLING

export interface GetButtonStateStartAction {
  type: ActionType.GET_BUTTON_STATE_START;
}

export interface GetButtonStateSuccessAction {
  type: ActionType.GET_BUTTON_STATE_SUCCESS;
  payload: number;
}

export interface GetButtonStateErrorAction {
  type: ActionType.GET_BUTTON_STATE_ERROR;
  payload: string;
}

export interface AddBetSlippAction {
  type: ActionType.ADD_BET_SLIP;
  payload?: CurrentGame;
}
export interface RemoveBetSlippAction {
  type: ActionType.REMOVE_BET_SLIP;
}
