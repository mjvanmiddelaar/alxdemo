import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Slice,
} from '@reduxjs/toolkit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {AppDispatch, RootState} from '../../store';
import {storage} from '../../utils';
import {API_BASE} from "@env"

// Define a type for the slice state
interface AuthenticationState {
  me?: Me;
  errors: {[key: string]: string};
  token?: string;
  loading: boolean;
}

export interface Me {
  name: string;
  email: string;
}

// Define the initial state using that type
const initialState: AuthenticationState = {
  me: undefined,
  errors: {},
  token: undefined,
  loading: false,
};

interface LoginDetails {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'authentication/login',
  async (loginDetails: LoginDetails) => {
    setLoading(true);
    const response = await fetch(`${API_BASE}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(loginDetails),
    });
    return (await response.text()) as string;
  },
);
export const logout = createAsyncThunk(
  'authentication/logout',
  async (_, {getState}) => {
    const state = getState() as RootState;
    setLoading(true);
    const response = await fetch(`${API_BASE}/api/logout`, {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Bearer ' + state.authentication.token,
      }),
    });
    return ((await response) as unknown) as void;
  },
);
export const me = createAsyncThunk(
  'authentication/me',
  async (_, {getState}) => {
    const state = getState() as RootState;
    setLoading(true);
    const response = await fetch(`${API_BASE}/api/me`, {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Bearer ' + state.authentication.token,
      }),
    });
    return (await response.json()) as Me;
  },
);

export const authenticationSlice: Slice<
  AuthenticationState,
  {
    setLoading: (_: any, {payload}: PayloadAction<boolean>) => void;
    setToken: (_: any, {payload}: PayloadAction<string>) => void;
  }
> = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setLoading: (
      state: AuthenticationState,
      {payload}: PayloadAction<boolean>,
    ) => {
      state.loading = payload;
    },
    setToken: (
      state: AuthenticationState,
      {payload}: PayloadAction<string>,
    ) => {
      state.token = payload;
    },
  },
  extraReducers: {
    [login.pending.type]: (state) => {
      state.loading = true;
    },
    [login.fulfilled.type]: (state, {payload}) => {
      const {message, errors, token} = JSON.parse(payload);
      if (message === 'The given data was invalid.') {
        state.errors = errors;
      } else {
        storage.save({key: 'token', data: token});
        state.token = token;
      }
      state.loading = false;
    },
    [login.rejected.type]: (state, {payload}) => {
      state.errors = payload;
      state.loading = false;
    },
    [logout.pending.type]: (state) => {
      state.loading = true;
    },
    [logout.fulfilled.type]: (state, {}) => {
      storage.remove({key: 'token'});
      state.token = undefined;
      state.me = undefined;
      state.loading = false;
    },
    [logout.rejected.type]: (state, {}) => {
      storage.remove({key: 'token'});
      state.token = undefined;
      state.loading = false;
    },
    [me.pending.type]: (state) => {
      console.log('pending');
      state.loading = true;
    },
    [me.fulfilled.type]: (state,  {payload}) => {
      state.me = payload
      state.loading = false;
    },
    [me.rejected.type]: (state, {}) => {
      storage.remove({key: 'token'});
      state.token = undefined;
      state.loading = false;
    },
  },
});

const {setLoading} = authenticationSlice.actions;
export const {setToken} = authenticationSlice.actions;
export const authenticationSelector = (state: RootState) =>
  state.authentication;

export default authenticationSlice.reducer;
