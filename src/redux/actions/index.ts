import {
  FetchGamesAction,
  FetchGamesSuccessAction,
  FetchGamesErrorAction,
  FetchSportsAction,
  FetchSportsSuccessAction,
  FetchSportsErrorAction,
  GetButtonStateStartAction,
  GetButtonStateSuccessAction,
  GetButtonStateErrorAction,
  AddBetSlippAction,
  RemoveBetSlippAction,
  FetchBetsHistoryAction,
  FetchBetsHistoryErrorAction,
  FetchBetsHistorySuccessAction,
  UpdateOddsFormatAction,
  FetchCurrentGameAction,
  FetchCurrentGameSuccessAction,
  FetchCurrentGameErrorAction,
  SetCurrentSportSlugAction,
  SetCurrentLeagueSlugAction,
  SetCurrentCountrySlugAction,
} from './interfaces';

export type GamesAction = FetchGamesAction | FetchGamesSuccessAction | FetchGamesErrorAction;
export type SportsAction = FetchSportsAction | FetchSportsSuccessAction | FetchSportsErrorAction;

export type CurrentGameAction =
  | FetchCurrentGameAction
  | FetchCurrentGameSuccessAction
  | FetchCurrentGameErrorAction;

export type BestHistoryAction =
  | FetchBetsHistoryAction
  | FetchBetsHistorySuccessAction
  | FetchBetsHistoryErrorAction;

export type SetCurrentSlugAction =
  | SetCurrentSportSlugAction
  | SetCurrentLeagueSlugAction
  | SetCurrentCountrySlugAction;

export type AppAction = UpdateOddsFormatAction;

export type BetSlipAction = AddBetSlippAction | RemoveBetSlippAction;

export type SetSlugAction = SetCurrentSportSlugAction | SetCurrentLeagueSlugAction;

export type GPXButtonsAction =
  | GetButtonStateStartAction
  | GetButtonStateSuccessAction
  | GetButtonStateErrorAction;
