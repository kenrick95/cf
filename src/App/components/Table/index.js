import React from 'react';
import TableHeader from './components/TableHeader';
import TableEntry from './components/TableEntry';
import TableInput from './components/TableInput';
import TableFooter from './components/TableFooter';

class Table extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <table className="table">
        <TableHeader />
        <tbody>
          <TableEntry />
          <TableInput />
        </tbody>
        <TableFooter />
      </table>
    );
  }
}

export default Table;
