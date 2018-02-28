import React from 'react';
import { connect } from 'react-redux';
import TableHeader from './components/TableHeader';
import TableEntry from './components/TableEntry';
import TableInput from './components/TableInput';
import TableFooter from './components/TableFooter';

class Table extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { entries } = this.props;
    return (
      <table className="table">
        <TableHeader />
        <tbody>
          {entries.map(entry => {
            return <TableEntry key={entry._id} {...entry} />;
          })}
          <TableInput />
        </tbody>
        <TableFooter
          total={entries.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          )}
        />
      </table>
    );
  }
}

export default connect(state => {
  return {
    entries:
      state &&
      state.entries &&
      state.entries.items &&
      state.entries.items.length > 0
        ? state.entries.items
        : []
  };
}, {})(Table);
