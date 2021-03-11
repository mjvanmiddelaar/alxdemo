// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {RootState, AppDispatch} from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
