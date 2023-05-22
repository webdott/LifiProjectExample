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
  FetchFeaturedGamesAction,
  FetchFeaturedGamesSuccessAction,
  FetchFeaturedGamesErrorAction,
  UpdateSlippageToleranceAction,
  UpdateQuickBetOptionsAction,
} from './interfaces';

export type GamesAction = FetchGamesAction | FetchGamesSuccessAction | FetchGamesErrorAction;
export type FeaturedGamesAction =
  | FetchFeaturedGamesAction
  | FetchFeaturedGamesSuccessAction
  | FetchFeaturedGamesErrorAction;
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

export type AppAction =
  | UpdateOddsFormatAction
  | UpdateSlippageToleranceAction
  | UpdateQuickBetOptionsAction;

export type BetSlipAction = AddBetSlippAction | RemoveBetSlippAction;

export type SetSlugAction = SetCurrentSportSlugAction | SetCurrentLeagueSlugAction;

export type GPXButtonsAction =
  | GetButtonStateStartAction
  | GetButtonStateSuccessAction
  | GetButtonStateErrorAction;
