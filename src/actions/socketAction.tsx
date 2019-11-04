// これはwebsocketを使っています
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const socketActions = {
    createEvent: actionCreator<string>('ACTIONS_CREATE_EVENT'),
};
