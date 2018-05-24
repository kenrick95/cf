import * as React from 'react';

import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import Settings from './components/Settings';
import Table from './components/Table';
import Summary from './components/Summary';

import 'normalize.css';
import './style.scss';
import { PouchDbContext } from './context';

type Props = {};

class App extends React.Component<Props> {
  store: Store<{}>;
  db: typeof PouchDB;
  constructor(props: Props) {
    super(props);
    const { store, db } = configureStore();
    this.store = store;
    this.db = db;
  }
  render() {
    return (
      <Provider store={this.store}>
        <PouchDbContext.Provider value={this.db}>
          <div className="app">
            <Settings />
            <Table />
            <Summary />
          </div>
        </PouchDbContext.Provider>
      </Provider>
    );
  }
}

export default App;
