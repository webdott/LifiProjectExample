import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import gamesReducer from './reducers/games';
import betsHistoryReducer from './reducers/betsHistory';
import gpxButtonReducer from './reducers/gpxButtonStates';
import betSlipReducer from './reducers/betSlip';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    gpxButtons: gpxButtonReducer,
    betSlip: betSlipReducer,
    betsHistory: betsHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
