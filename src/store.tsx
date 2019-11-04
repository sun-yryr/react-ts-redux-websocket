import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { hogeReducer, HogeState } from './reducers/hogeState';

export type AppState = {
    hoge: HogeState
};

const store = createStore(
    combineReducers<AppState>({
        hoge: hogeReducer,
    }),
    applyMiddleware(thunkMiddleware),
);

export default store;
