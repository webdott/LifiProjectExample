import { Dispatch } from 'redux';
import { fetchGames } from '@azuro-protocol/sdk';

import { ActionType } from '../action-types';
import { Action, BetSlipAction, GPXButtonsAction } from '../actions';
import { getBlockNumber } from './../../functions';
import { CurrentGame } from '../reducers/betSlip';

export const fetchAllGames = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.FETCH_GAMES_START,
    });
    const blockNumber = await getBlockNumber();
    try {
      const games = await fetchGames({
        filters: {
          resolved: false,
          canceled: false,
        },
        from: blockNumber,
      });

      dispatch({
        type: ActionType.FETCH_GAMES_SUCCESSS,
        payload: games,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.FETCH_GAMES_ERROR,
        payload: err.message,
      });
    }
  };
};

export const getGpxButtonState = (indexNumber: number) => {
  return async (dispatch: Dispatch<GPXButtonsAction>) => {
    dispatch({
      type: ActionType.GET_BUTTON_STATE_START,
    });

    if (indexNumber) {
      dispatch({
        type: ActionType.GET_BUTTON_STATE_SUCCESS,
        payload: indexNumber,
      });
    } else {
      dispatch({
        type: ActionType.GET_BUTTON_STATE_ERROR,
        payload: 'Invalid Index Number',
      });
    }
  };
};

export const addBetSlip = (game: CurrentGame) => {
  return (dispatch: Dispatch<BetSlipAction>) => {
    dispatch({
      type: ActionType.ADD_BET_SLIP,
      payload: game,
    });
  };
};

export const removeBetSlip = () => {
  return (dispatch: Dispatch<BetSlipAction>) => {
    dispatch({
      type: ActionType.REMOVE_BET_SLIP,
    });
  };
};
