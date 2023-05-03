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
  UpdateOddsFormatAction,
} from './interfaces';

export type GamesAction = FetchGamesAction | FetchGamesSuccessAction | FecthGamesErrorAction;
export type BestHistoryAction =
  | FetchBetsHistoryAction
  | FetchBetsHistorySuccessAction
  | FecthBetsHistoryErrorAction;

export type AppAction = UpdateOddsFormatAction;

export type BetSlipAction = AddBetSlippAction | RemoveBetSlippAction;

export type GPXButtonsAction =
  | GetButtonStateStartAction
  | GetButtonStateSuccessAction
  | GetButtonStateErrorAction;
