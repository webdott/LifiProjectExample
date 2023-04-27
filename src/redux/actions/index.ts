import {
  FetchGamesAction,
  FetchGamesSuccessAction,
  FecthGamesErrorAction,
  GetButtonStateStartAction,
  GetButtonStateSuccessAction,
  GetButtonStateErrorAction,
  AddBetSlippAction,
  RemoveBetSlippAction,
} from './interfaces';

export type Action = FetchGamesAction | FetchGamesSuccessAction | FecthGamesErrorAction;

export type BetSlipAction = AddBetSlippAction | RemoveBetSlippAction;

export type GPXButtonsAction =
  | GetButtonStateStartAction
  | GetButtonStateSuccessAction
  | GetButtonStateErrorAction;
