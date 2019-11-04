import * as React from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import { todoActionCreator } from './action';
import { IRootState } from './store';
import Memo from './Memo';

// ReduxのStoreをReactのContainerのPropsに変換するinterfaceを定義
interface IStateToProps {
    todos: string[];
}

// ReduxのDispatchをPropsに変換するinterfaceを定義
// メンバにはどのアクションを実行するのかを定義する
interface IDispatchToProps {
    addTodo: (todo: string) => void;
}

// IStateToPropsとIDispatchToPropsの複合型を定義
type IProps = IStateToProps & IDispatchToProps;

// IPropsを受け取るContainerを定義
// Stateは持たないので空の定義を渡す
/* tslint:disable:jsx-no-lambda */
class MemoContainer extends React.Component<IProps, {}> {
    // TodoComponentにわたすコールバック関数
    private onClickAddButton = (todo: string): void => {
        const { addTodo } = this.props;
        addTodo(todo);
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
const mapDispatchToProps = (dispatch: Dispatch<Action>): IDispatchToProps => ({
    addTodo: (todo: string) => dispatch(todoActionCreator.addTodoAction(todo)),
});

// Storeが更新されたときの挙動が詰められたIStatePropsと、
// Storeを更新するためのメソッドが詰められたIDispatchToPropsをTodoContainerと繋ぎこむ
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MemoContainer);
