import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { socketActions } from '../actions/socketAction';

export interface HogeState {
    message: string;
}

const initialState: HogeState = {
    message: '',
};

export const hogeReducer = reducerWithInitialState(initialState)
    .case(socketActions.createEvent, (state: HogeState, message) => ({ ...state, message }));
