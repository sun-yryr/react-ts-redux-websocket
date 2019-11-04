import * as React from 'react';
import { Provider } from 'react-redux';
import MemoContainer from './MemoContainer';
import store from './store';

/* tslint:disable:no-console */
/* tslint:disable:jsx-no-lambda */
const App: React.FC = () => (
    <Provider store={store}>
        <MemoContainer />
    </Provider>
);

export default App;
