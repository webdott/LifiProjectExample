import { SportSlug } from '../../constants/sports';
import { OddsFormat } from '../reducers/app';
import { CurrentGame } from '../reducers/betSlip';
import { AzuroBet } from '../reducers/betsHistory';
import { AzuroGame } from '../reducers/games';
import { AzuroSport } from '../reducers/sports';
import { ActionType } from './../action-types';

export interface FetchGamesAction {
  type: ActionType.FETCH_GAMES_START;
}

export interface FetchGamesSuccessAction {
  type: ActionType.FETCH_GAMES_SUCCESS;
  payload: { [key: string]: AzuroGame };
}

export interface FetchGamesErrorAction {
  type: ActionType.FETCH_GAMES_ERROR;
  payload: string;
}

export interface FetchFeaturedGamesAction {
  type: ActionType.FETCH_FEATURED_GAMES_START;
}

export interface FetchFeaturedGamesSuccessAction {
  type: ActionType.FETCH_FEATURED_GAMES_SUCCESS;
  payload: AzuroGame[];
}

export interface FetchFeaturedGamesErrorAction {
  type: ActionType.FETCH_FEATURED_GAMES_ERROR;
  payload: string;
}

export interface FetchSportsAction {
  type: ActionType.FETCH_SPORTS_START;
}

export interface FetchSportsSuccessAction {
  type: ActionType.FETCH_SPORTS_SUCCESS;
  payload: AzuroSport[];
}

export interface FetchSportsErrorAction {
  type: ActionType.FETCH_SPORTS_ERROR;
  payload: string;
}

export interface FetchCurrentGameAction {
  type: ActionType.FETCH_CURRENT_GAME_START;
}

export interface FetchCurrentGameSuccessAction {
  type: ActionType.FETCH_CURRENT_GAME_SUCCESS;
  payload: AzuroGame;
}

export interface FetchCurrentGameErrorAction {
  type: ActionType.FETCH_CURRENT_GAME_ERROR;
  payload: string;
}

export interface FetchBetsHistoryAction {
  type: ActionType.FETCH_BETS_HISTORY_START;
}

export interface FetchBetsHistorySuccessAction {
  type: ActionType.FETCH_BETS_HISTORY_SUCCESS;
  payload: AzuroBet[];
}

export interface FetchBetsHistoryErrorAction {
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
export interface UpdateSlippageToleranceAction {
  type: ActionType.UPDATE_SLIPPAGE_TOLERANCE;
  payload: number;
}
export interface UpdateQuickBetOptionsAction {
  type: ActionType.UPDATE_QUICK_BET_OPTIONS;
  payload: number[];
}

export interface SetCurrentSportSlugAction {
  type: ActionType.SET_CURRENT_SPORT_SLUG;
  payload: SportSlug | null;
}
export interface SetCurrentLeagueSlugAction {
  type: ActionType.SET_CURRENT_LEAGUE_SLUG;
  payload: string | null;
}

export interface SetCurrentCountrySlugAction {
  type: ActionType.SET_CURRENT_COUNTRY_SLUG;
  payload: string | null;
}

export interface ResetCurrentSlugsAction {
  type: ActionType.RESET_CURRENT_SLUGS;
}
