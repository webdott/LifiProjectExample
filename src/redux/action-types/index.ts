export enum ActionType {
  FETCH_SPORTS_START = 'FETCH_SPORTS_START',
  FETCH_SPORTS_SUCCESS = 'FETCH_SPORTS_SUCCESS',
  FETCH_SPORTS_ERROR = 'FETCH_SPORTS_ERROR',

  FETCH_GAMES_START = 'FETCH_GAMES_START',
  FETCH_GAMES_SUCCESS = 'FETCH_GAMES_SUCCESS',
  FETCH_GAMES_ERROR = 'FETCH_GAMES_ERROR',

  FETCH_FEATURED_GAMES_START = 'FETCH_FEATURED_GAMES_START',
  FETCH_FEATURED_GAMES_SUCCESS = 'FETCH_FEATURED_GAMES_SUCCESS',
  FETCH_FEATURED_GAMES_ERROR = 'FETCH_FEATURED_GAMES_ERROR',

  FETCH_CURRENT_GAME_START = 'FETCH_CURRENT_GAME_START',
  FETCH_CURRENT_GAME_SUCCESS = 'FETCH_CURRENT_GAME_SUCCESS',
  FETCH_CURRENT_GAME_ERROR = 'FETCH_CURRENT_GAME_ERROR',

  SET_CURRENT_SPORT_SLUG = 'SET_CURRENT_SPORT_SLUG',
  SET_CURRENT_LEAGUE_SLUG = 'SET_CURRENT_LEAGUE_SLUG',
  SET_CURRENT_COUNTRY_SLUG = 'SET_CURRENT_COUNTRY_SLUG',

  FETCH_BETS_HISTORY_START = 'FETCH_BETS_HISTORY_START',
  FETCH_BETS_HISTORY_SUCCESS = 'FETCH_BETS_HISTORY_SUCCESS',
  FETCH_BETS_HISTORY_ERROR = 'FETCH_BETS_HISTORY_ERROR',

  GET_BUTTON_STATE_START = 'GET_BUTTON_STATE_START',
  GET_BUTTON_STATE_SUCCESS = 'GET_BUTTON_STATE_SUCCESS',
  GET_BUTTON_STATE_ERROR = 'GET_BUTTON_STATE_ERROR',

  ADD_BET_SLIP = 'ADD_BET_SLIP',
  REMOVE_BET_SLIP = 'REMOVE_BET_SLIP',

  UPDATE_ODDS_FORMAT = 'UPDATE_ODDS_FORMAT',
}
