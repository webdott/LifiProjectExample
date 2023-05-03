import { OddsFormat } from '../reducers/app';
import { CurrentGame } from '../reducers/betSlip';
import { AzuroBet } from '../reducers/betsHistory';
import { AzuroGame } from '../reducers/games';
import { ActionType } from './../action-types';

export interface FetchGamesAction {
  type: ActionType.FETCH_GAMES_START;
}

export interface FetchGamesSuccessAction {
  type: ActionType.FETCH_GAMES_SUCCESSS;
  payload: AzuroGame[];
}

export interface FecthGamesErrorAction {
  type: ActionType.FETCH_GAMES_ERROR;
  payload: string;
}
export interface FetchCurrentGameAction {
  type: ActionType.FETCH_CURRENT_GAME_START;
}

export interface FetchCurrentGameSuccessAction {
  type: ActionType.FETCH_CURRENT_GAME_SUCCESSS;
  payload: AzuroGame;
}

export interface FecthCurrentGameErrorAction {
  type: ActionType.FETCH_CURRENT_GAME_ERROR;
  payload: string;
}

export interface FetchBetsHistoryAction {
  type: ActionType.FETCH_BETS_HISTORY_START;
}

export interface FetchBetsHistorySuccessAction {
  type: ActionType.FETCH_BETS_HISTORY_SUCCESSS;
  payload: AzuroBet[];
}

export interface FecthBetsHistoryErrorAction {
  type: ActionType.FETCH_BETS_HISTORY_ERROR;
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

export interface UpdateOddsFormatAction {
  type: ActionType.UPDATE_ODDS_FORMAT;
  payload?: OddsFormat;
}
