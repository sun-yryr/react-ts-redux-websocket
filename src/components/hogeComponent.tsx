import * as React from 'react';
import { HogeState } from '../reducers/hogeState';
import { HogeActions } from '../containers/hogeContainer';

interface OwnProps { }

type HogeProps = OwnProps & HogeState & HogeActions;

export const HogeComponent: React.SFC<HogeProps> = (props: HogeProps) => {
    const { name, email } = props;
    return (
        <div>
            <div className="field">
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => props.updateName(e.target.value)}
                />
            </div>
            <div className="field">
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => props.updateEmail(e.target.value)}
                />
            </div>
        </div>
    );
};
