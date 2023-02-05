import {
  FetchGamesAction,
  FetchGamesSuccessAction,
  FecthGamesErrorAction,
  GetButtonStateStartAction,
  GetButtonStateSuccessAction,
  GetButtonStateErrorAction,
} from "./interfaces";

export type Action =
  | FetchGamesAction
  | FetchGamesSuccessAction
  | FecthGamesErrorAction;

export type GPXButtonsAction =
  | GetButtonStateStartAction
  | GetButtonStateSuccessAction
  | GetButtonStateErrorAction;
