import * as React from 'react';
import Settings from './components/Settings';
import Table from './components/Table';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import { Store } from 'redux';

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
        </div>
      </Provider>
    );
  }
}

export default App;
