import React from 'react';
import Table from './components/Table';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import { Store } from 'react-redux';

class App extends React.Component {
  store: Store;
  constructor() {
    super();
    this.store = configureStore();
  }
  render() {
    return (
      <Provider store={this.store}>
        <div className="app">
          <Table />
        </div>
      </Provider>
    );
  }
}

export default App;
