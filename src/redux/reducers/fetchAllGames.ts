import { ActionType } from "../action-types";
import { Action } from "../actions";
import type { AzuroGame } from "@azuro-protocol/sdk";

interface GamesState {
  loading: boolean;
  error: string | null;
  data: AzuroGame[];
}

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const reducer = (
  state: GamesState = initialState,
  action: Action
): GamesState => {
  switch (action.type) {
    case ActionType.FETCH_GAMES_START:
      return {
        loading: true,
        error: null,
        data: [],
      };
    case ActionType.FETCH_GAMES_SUCCESSS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };

    case ActionType.FETCH_GAMES_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: [],
      };

    default:
      return state;
  }
};

export default reducer;
