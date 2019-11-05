import {
    Action,
    createStore,
    Store,
    applyMiddleware,
} from 'redux';
import { middleware } from './websocket';

import reducer from './reducer';

// Storeが持つTodoにの状態を定義
export interface ITodoState {
    todos: string[];
}
export interface IWebsocketState {
    message: string;
}

// 全てのStateを集約したStateを定義
export interface IRootState {
    todoState: ITodoState;
    websocketState: IWebsocketState;
}

// importしたreducerを渡してstoreを作成
const store: Store = createStore(
    reducer,
    applyMiddleware(middleware),
);

export default store;
