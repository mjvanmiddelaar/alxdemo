import {configureStore} from '@reduxjs/toolkit';
import randomJokes from './features/randomJokes/RandomJokesSlice';
import signup from './features/signup/SignupSlice';
import authentication from './features/authentication/AuthenticationSlice';
import kitsu from './features/kitsu/KitsuSlice';

const store = configureStore({
  reducer: {
    randomJokes,
    signup,
    authentication,
    kitsu,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
