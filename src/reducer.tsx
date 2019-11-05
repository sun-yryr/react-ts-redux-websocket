import { combineReducers, Reducer } from 'redux';

import { IAddTodoAction, TodoAction, TodoActionType } from './action';
import { IRootState, ITodoState, IWebsocketState } from './store';
import { IWebsocketMessageAction, WebsocketAction, WebsocketType } from './websocket';

// ITodoStateの初期データを作成
const initTodoState: ITodoState = {
    todos: [],
};

// Todoで発生するactionに対応してReduxのstateを返すReducerを作成
const todoReducer: Reducer<ITodoState, TodoAction> = (
    state: ITodoState = initTodoState,
    action: TodoAction,
): ITodoState => {
    // 関数の引数として渡されてきたactionのtypeを見てReduxのstateを返す
    switch (action.type) {
        case TodoActionType.ADD_TODO: {
            // ADD_TODOの場合はactionのpayloadに新しいtodoが詰められているので
            // それを取り出してtodosに追加して新しいstateとして返す
            const addTodoAction: IAddTodoAction = action;
            return {
                ...state,
                todos: state.todos.concat([addTodoAction.payload.todo]),
            };
        }
        default:
            return state;
    }
};

const websocketReducer: Reducer<IWebsocketState, WebsocketAction> = (
    state: IWebsocketState = { message: 'init' },
    action: WebsocketAction,
): IWebsocketState => {
    switch (action.type) {
        case WebsocketType.OPEN: {
            console.log('Websocket open');
            break;
        }
        case WebsocketType.CLOSE: {
            console.log('Websocket close');
            break;
        }
        case WebsocketType.MESSAGE: {
            console.log('Websocket message');
            const messageAction: IWebsocketMessageAction = action;
            console.log(messageAction.payload.event.data);
            break;
        }
        default:
            break;
    }
    return state;
};

// 全てを集約したReducerを作成
const reducer: Reducer<IRootState> = combineReducers({
    todoState: todoReducer,
    websocketState: websocketReducer,
});

export default reducer;
