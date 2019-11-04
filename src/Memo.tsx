import * as React from 'react';
import styled from 'styled-components';

interface IProps {
    todos: string[];
    onClickAddButton: (todo: string) => void;
}

interface IState {
    text: string;
}

const Root = styled.div`
    width: 500px
    margin: 0 auto
    background-color: #f3f3f3
`;

/* tslint:disable:jsx-no-lambda */
export default class extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        // Componentのstateの初期化
        this.state = {
            text: '',
        };
    }

    // テキストが更新されたときのイベント関数
    private onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // text inputに文字が入力されるたびに入力内容をinputに反映させている
        this.setState({ text: e.currentTarget.value });
    };

    // ボタンがクリックされたときのイベント関数
    private onClickAddButton = () => {
        const { onClickAddButton } = this.props;
        const { text } = this.state;
        onClickAddButton(text);
    };

    public render() {
        const { todos } = this.props;
        const { text } = this.state;
        return (
            <Root>
                <h1>TODO LIST</h1>
                <input type="text" value={text} onChange={this.onTextChange} />
                <button onClick={this.onClickAddButton}>Add Todo</button>
                <ul>
                    {todos.map((todo, i) => (
                        <li key={i}>{todo}</li>
                    ))}
                </ul>
            </Root>
        );
    }
}
