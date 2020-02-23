import * as React from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import { todoActionCreator } from './action';
import store, { IRootState } from './store';
import Memo from './Memo';
import { WebsocketType, WebsocketAction, websocketActionCreater } from './websocket';
import { CalendarEvent } from './types';

// ReduxのStoreをReactのContainerのPropsに変換するinterfaceを定義
interface IStateToProps {
    todos: string[];
}

// ReduxのDispatchをPropsに変換するinterfaceを定義
// メンバにはどのアクションを実行するのかを定義する
interface IDispatchToProps {
    sendMessage: (event: CalendarEvent) => void;
}

// IStateToPropsとIDispatchToPropsの複合型を定義
type IProps = IStateToProps & IDispatchToProps;

// IPropsを受け取るContainerを定義
// Stateは持たないので空の定義を渡す
/* tslint:disable:jsx-no-lambda */
class MemoContainer extends React.Component<IProps, {}> {
    componentDidMount() {
        const action = (url = 'ws://agile-river-42294.herokuapp.com') => ({
            type: WebsocketType.CONNECT,
            payload: { url },
        });
        store.dispatch(action());
    }

    // TodoComponentにわたすコールバック関数
    private onClickAddButton = (event: CalendarEvent): void => {
        const { sendMessage } = this.props;
        sendMessage(event);
    };

    render(): JSX.Element {
        // TodoComponentにpropsの値を詰めて返す
        const { todos } = this.props;
        return (
            <Memo todos={todos} onClickAddButton={this.onClickAddButton} />
        );
    }
}

// Storeが更新されたときに送られてくるStateを受け取り、
// IStateToPropsに変換して返す関数を定義
const mapStateToProps = (state: IRootState): IStateToProps => {
    const { todoState } = state;
    return {
        todos: todoState.todos,
    };
};

// Dispatchを受け取り、IDispatchToPropsの関数でどのアクションをDispatchするのかを定義する
// initwebsocket達を使うためには，action.typeを宣言しないといけない。
// ↑これは，reduxでwebsocketの状態を管理しないといけないということ？
const mapDispatchToProps = (dispatch: Dispatch<Action>): IDispatchToProps => ({
    sendMessage: (event: CalendarEvent) => dispatch(websocketActionCreater.sendMessageAction(event)),
});

// Storeが更新されたときの挙動が詰められたIStatePropsと、
// Storeを更新するためのメソッドが詰められたIDispatchToPropsをTodoContainerと繋ぎこむ
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MemoContainer);
