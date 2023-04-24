import { ActionType } from '../action-types';
import { GPXButtonsAction } from '../actions';

interface GpxButtonState {
  loading: boolean;
  indexNumber: number | null;
  error: string | null;
}

const initialState = {
  loading: false,
  indexNumber: 1,
  error: null,
};

const gpxButtonReducer = (
  state: GpxButtonState = initialState,
  action: GPXButtonsAction
): GpxButtonState => {
  switch (action.type) {
    case ActionType.GET_BUTTON_STATE_START:
      return {
        loading: true,
        indexNumber: 1,
        error: null,
      };
    case ActionType.GET_BUTTON_STATE_SUCCESS:
      return {
        loading: false,
        indexNumber: action.payload,
        error: null,
      };

    case ActionType.GET_BUTTON_STATE_ERROR:
      return {
        loading: false,
        error: action.payload,
        indexNumber: null,
      };

    default:
      return state;
  }
};

export default gpxButtonReducer;
