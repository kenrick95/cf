import * as React from 'react';

import { connect } from 'react-redux';
import { EntryDocument } from '../../../../types/entry';
import { ReduxStore } from '../../../../redux/reducers';

import csvFileCreator from 'csv-file-creator';

import './style.scss';
interface PropsFromStore {
  entries: EntryDocument[];
}
interface Props extends PropsFromStore {}

class Backup extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleExport = this.handleExport.bind(this);
  }
  handleExport() {
    const table = [];
    const header = [
      '_id',
      '_rev',
      'number',
      'date',
      'category',
      'name',
      'location',
      'amount',
      'deleted'
    ];
    table.push(header);
    for (const entry of this.props.entries) {
      const row = [
        entry._id,
        entry._rev,
        entry.number,
        entry.date,
        entry.category,
        entry.name,
        entry.location,
        entry.amount,
        entry.deleted
      ];
      table.push(row);
    }
    csvFileCreator('export.csv', table);
  }
  render() {
    return (
      <div className="backup">
        <div className="backup-title">Backup</div>
        <div className="backup-action">
          <button className="backup-export" onClick={this.handleExport}>
            Export as csv
          </button>

          {/* <label className="backup-import">
            Import
            <input type="file" className="backup-import-input" />
          </label> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: ReduxStore): PropsFromStore {
  const entries = state.entries ? state.entries.items : [];
  return {
    entries
  };
}

export default connect<PropsFromStore>(mapStateToProps)(Backup);
