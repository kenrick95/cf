import * as React from 'react';

import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import Settings from './components/Settings';
import Table from './components/Table';
import Summary from './components/Summary';

import 'normalize.css';
import './style.scss';

type Props = {};

class App extends React.Component<Props> {
  store: Store<{}>;
  constructor(props: Props) {
    super(props);
    this.store = configureStore();
  }
  render() {
    return (
      <Provider store={this.store}>
        <div className="app">
          <Settings />
          <Table />
          <Summary />
        </div>
      </Provider>
    );
  }
}

export default App;
