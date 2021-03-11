import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Slice,
} from '@reduxjs/toolkit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {AppDispatch, RootState} from '../../store';
import {Me} from "../authentication/AuthenticationSlice";
import {API_BASE} from "@env";

// Define a type for the slice state
interface SignupState {
  errors: Record<string, string>[];
  loading: boolean;
}

// Define the initial state using that type
const initialState: SignupState = {
  errors: [],
  loading: false,
};

interface SignupDetails {
  name: string
  email: string
  password: string
}

export const signup = createAsyncThunk('signup', async (signupDetails: SignupDetails) => {
  setLoading(true);
  const response = await fetch(`${API_BASE}/api/signup`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(signupDetails),
  });
  return (await response.json()) as Me;
});

export const signupSlice: Slice<
  SignupState,
  {
    setLoading: (_: any, {payload}: PayloadAction<boolean>) => void;
    setEmail: (_: any, {payload}: PayloadAction<string>) => void;
  }
> = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setLoading: (state: SignupState, {payload}: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setEmail: (state: SignupState, {payload}: PayloadAction<string>) => {
      state.email = payload;
    },
  },
  extraReducers: {
    [signup.pending.type]: (state) => {
      state.loading = true;
    },
    [signup.fulfilled.type]: (state, {payload}) => {
      state.email = payload.email;
      state.loading = false;
    },
    [signup.rejected.type]: (state, {payload}) => {
      state.errors = payload.errors;
      state.loading = false;
    },
  },
});

const {setLoading} = signupSlice.actions;

export const signupSelector = (state: RootState) => state.signup;

export default signupSlice.reducer;
