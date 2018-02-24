import React from 'react';
import Table from './components/Table';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';

class App extends React.Component {
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
