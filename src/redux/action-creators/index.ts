import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Action, GPXButtonsAction } from '../actions';
import { fetchGames } from '@azuro-protocol/sdk';
import { getBlockNumber } from './../../functions';

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
