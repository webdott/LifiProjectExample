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
  FetchCurrentGameAction,
  FetchCurrentGameSuccessAction,
  FecthCurrentGameErrorAction,
} from './interfaces';

export type GamesAction = FetchGamesAction | FetchGamesSuccessAction | FecthGamesErrorAction;

export type CurrentGameAction =
  | FetchCurrentGameAction
  | FetchCurrentGameSuccessAction
  | FecthCurrentGameErrorAction;

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
