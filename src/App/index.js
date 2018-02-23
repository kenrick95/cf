import React from 'react';
import Table from './components/Table';
import configureStore from './redux/configureStore';

class App extends React.Component {
  constructor() {
    super();
    configureStore();
  }
  render() {
    return (
      <div className="app">
        <Table />
      </div>
    );
  }
}

export default App;
