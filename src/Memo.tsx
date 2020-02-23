import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { CalendarEvent } from './types';

import 'react-datepicker/dist/react-datepicker.css';

interface IProps {
    todos: string[];
    onClickAddButton: (event: CalendarEvent) => void;
}

interface IState {
    title: string,
    description: string,
    startSchedule: Date,
    endSchedule: Date,
    calendarName: string,
    isAllDay: boolean,
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
            title: '',
            description: '',
            startSchedule: new Date(),
            endSchedule: new Date(),
            calendarName: 'Taiyo Minagawa',
            isAllDay: true,
        };

        this.changeCheckbox = this.changeCheckbox.bind(this);
    }

    // テキストが更新されたときのイベント関数
    private onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { title, ...other } = this.state;
        // text inputに文字が入力されるたびに入力内容をinputに反映させている
        this.setState({
            ...other,
            title: e.currentTarget.value,
        });
    };

    private onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { description, ...other } = this.state;
        // text inputに文字が入力されるたびに入力内容をinputに反映させている
        this.setState({
            ...other,
            description: e.currentTarget.value,
        });
    };

    handleChange = (date: Date | null) => {
        const { startSchedule, isAllDay, ...other } = this.state;
        const d = date!;
        console.log(isAllDay);
        if (isAllDay) {
            this.setState({
                ...other,
                startSchedule: d,
                endSchedule: d,
            });
        } else {
            this.setState({
                ...other,
                startSchedule: d,
            });
        }
    }

    handleEndChange = (date: Date | null) => {
        const { endSchedule, isAllDay, ...other } = this.state;
        const d = date!;
        this.setState({
            ...other,
            endSchedule: d,
        });
    }

    private onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { calendarName, ...other } = this.state;
        // text inputに文字が入力されるたびに入力内容をinputに反映させている
        this.setState({
            ...other,
            calendarName: e.currentTarget.value,
        });
    };

    // ボタンがクリックされたときのイベント関数
    private onClickAddButton = () => {
        const { onClickAddButton } = this.props;
        const { isAllDay, startSchedule, endSchedule, ...other } = this.state;
        const event: CalendarEvent = {
            ...other,
            startSchedule: moment(startSchedule),
            endSchedule: moment(endSchedule),
        };
        onClickAddButton(event);
    };

    changeCheckbox() {
        const { isAllDay, startSchedule, endSchedule, ...other } = this.state;
        let e = endSchedule;
        if (!isAllDay) {
            e = startSchedule;
        }
        this.setState({
            isAllDay: !isAllDay,
            startSchedule,
            endSchedule: e,
            ...other,
        });
    }

    public render() {
        const { todos } = this.props;
        const { title, description, startSchedule, endSchedule, isAllDay } = this.state;
        return (
            <Root>
                <h1>Calendar</h1>
                <input type="text" value={title} onChange={this.onTitleChange} />
                <input type="text" value={description} onChange={this.onDescriptionChange} />
                <DatePicker
                    selected={startSchedule}
                    onChange={(date) => this.handleChange(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    dateFormat="yyyy-MM-dd HH:mm"
                />
                {!isAllDay ? (
                    <DatePicker
                        selected={endSchedule}
                        onChange={(date) => this.handleEndChange(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="yyyy-MM-dd HH:mm"
                    />
                ) : null}
                <input type="checkbox" defaultChecked={isAllDay} onChange={this.changeCheckbox} />
                <button onClick={this.onClickAddButton}>Add Todo</button>
            </Root>
        );
    }
}
