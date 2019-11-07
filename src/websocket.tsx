import { Action } from 'redux';
import { todoActionCreator } from './action';

export enum WebsocketType {
    CONNECT = 'WEBSOCKET:CONNECT',
    SEND = 'WEBSOCKET:SEND',
    DISCONNECT = 'WEBSOCKET:DISCONNECT',
    OPEN = 'WEBSOCKET:OPEN',
    CLOSE = 'WEBSOCKET:CLOSE',
    MESSAGE = 'WEBSOCKET:MESSAGE',
}

interface IWebsocketConnectAction extends Action {
    type: WebsocketType.CONNECT;
    payload: {
       url: string;
    };
}
interface IWebsocketSendAction extends Action {
    type: WebsocketType.SEND;
    payload: Object;
}
interface IWebsocketDisconnectAction extends Action {
    type: WebsocketType.DISCONNECT;
}
interface IWebsocketOpenAction extends Action {
    type: WebsocketType.OPEN;
}
interface IWebsocketCloseAction extends Action {
    type: WebsocketType.CLOSE;
    payload: { event: CloseEvent };
}
export interface IWebsocketMessageAction extends Action {
    type: WebsocketType.MESSAGE;
    payload: MessageEvent;
}

export type WebsocketAction =
    IWebsocketConnectAction
    | IWebsocketSendAction
    | IWebsocketDisconnectAction
    | IWebsocketOpenAction
    | IWebsocketCloseAction
    | IWebsocketMessageAction;

let websocket: WebSocket;

export const middleware = ({ dispatch }: { dispatch: any }) => (next: any) => (action: WebsocketAction) => {
    switch (action.type) {
        case 'WEBSOCKET:CONNECT':
            // Configure the object
            websocket = new WebSocket(action.payload.url);

            // Attach the callbacks
            websocket.onopen = () => dispatch({ type: 'WEBSOCKET:OPEN' });
            websocket.onclose = (event) => dispatch({ type: 'WEBSOCKET:CLOSE', payload: event });
            websocket.onmessage = (event) => dispatch(todoActionCreator.addTodoAction(event.data));

            break;

        // User request to send a message
        case 'WEBSOCKET:SEND':
            websocket.send(JSON.stringify(action.payload));
            break;

        // User request to disconnect
        case 'WEBSOCKET:DISCONNECT':
            websocket.close();
            break;

        default: // We don't really need the default but ...
            break;
    }
    return next(action);
};

export interface IWebsocketActionCreater {
    sendMessageAction(message: string): IWebsocketSendAction
}

class WebsocketActionCreater implements IWebsocketActionCreater {
    public sendMessageAction = (message: string): IWebsocketSendAction => ({
        type: WebsocketType.SEND,
        payload: {
            message,
        },
    });
}
export const websocketActionCreater: IWebsocketActionCreater = new WebsocketActionCreater();
