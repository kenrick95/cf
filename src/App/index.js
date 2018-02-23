import React from 'react';
import Table from './components/Table';
class App extends React.Component {
  constructor() {
    super();
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
