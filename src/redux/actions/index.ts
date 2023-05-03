import {
  FetchGamesAction,
  FetchGamesSuccessAction,
  FecthGamesErrorAction,
  GetButtonStateStartAction,
  GetButtonStateSuccessAction,
  GetButtonStateErrorAction,
  AddBetSlippAction,
  RemoveBetSlippAction,
  FetchBetsHistoryAction,
  FecthBetsHistoryErrorAction,
  FetchBetsHistorySuccessAction,
} from './interfaces';

export type GamesAction = FetchGamesAction | FetchGamesSuccessAction | FecthGamesErrorAction;
export type BestHistoryAction =
  | FetchBetsHistoryAction
  | FetchBetsHistorySuccessAction
  | FecthBetsHistoryErrorAction;

export type BetSlipAction = AddBetSlippAction | RemoveBetSlippAction;

export type GPXButtonsAction =
  | GetButtonStateStartAction
  | GetButtonStateSuccessAction
  | GetButtonStateErrorAction;
