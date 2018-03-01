import * as React from 'react';
import { connect } from 'react-redux';
import TableHeader from './components/TableHeader';
import TableEntry from './components/TableEntry';
import TableInput from './components/TableInput';
import TableFooter from './components/TableFooter';

import { EntryDocument } from '../../types/entry';
import { ReduxStore } from '../../redux/reducers';

interface PropsFromStore {
  entries: EntryDocument[];
}
interface Props extends PropsFromStore {}

class Table extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
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
        </tbody>
        <tbody>
          <TableInput number={entries.length + 1} />
        </tbody>
        <TableFooter
          total={entries.reduce(
            (previousValue: number, entry: EntryDocument) =>
              previousValue + entry.amount,
            0
          )}
        />
      </table>
    );
  }
}

function mapStateToProps(state: ReduxStore): PropsFromStore {
  return {
    entries:
      state &&
      state.entries &&
      state.entries.items &&
      state.entries.items.length > 0
        ? state.entries.items
        : []
  };
}

export default connect(mapStateToProps)(Table);
