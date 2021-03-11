import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Slice,
} from '@reduxjs/toolkit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {AppDispatch, RootState} from '../../store';

// Define a type for the slice state
interface RandomJokesState {
  jokes: Joke[];
  rateLimited: boolean;
  loading: boolean;
}

export interface Joke {
  id: string;
  type: string;
  setup: string;
  punchline: string;
}

// Define the initial state using that type
const initialState: RandomJokesState = {
  jokes: [],
  rateLimited: false,
  loading: true,
};

export const fetchJokes = createAsyncThunk('randomJokes/fetch', async () => {
  setLoading(true);
  const response = await fetch(
    'https://official-joke-api.appspot.com/jokes/ten',
  );
  return (await response.json()) as Joke[];
});

export const randomJokesSlice: Slice<
  RandomJokesState,
  {
    setLoading: (_: any, {payload}: PayloadAction<boolean>) => void;
    setActiveJoke: (_: any, {payload}: PayloadAction<number>) => void;
  }
> = createSlice({
  name: 'randomJokes',
  initialState,
  reducers: {
    setLoading: (state, {payload}: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setActiveJoke: (state, {payload}: PayloadAction<number>) => {
      if (payload < 10 && payload >= 0) {
        state.activeJoke = payload;
      } else {
        state.activeJoke = 0;
      }
    },
  },
  extraReducers: {
    [fetchJokes.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchJokes.fulfilled.type]: (state, {payload}) => {
      if (
        payload.message ===
        'Your ip has exceeded the 100 request limit per 15 minute(s). Try again in in 15 minute(s).'
      ) {
        state.rateLimited = true;
      } else {
        state.jokes = payload;
      }
      state.loading = false;
    },
  },
});

const {setLoading} = randomJokesSlice.actions;
export const {setActiveJoke} = randomJokesSlice.actions;

export const randomJokeState = (state: RootState) => state.randomJokes;

export default randomJokesSlice.reducer;
