import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import gamesReducer from './reducers/fetchAllGames';
import gpxButtonReducer from './reducers/gpxButtonStates';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    gpxButtons: gpxButtonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
