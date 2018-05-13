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
    this.handleImport = this.handleImport.bind(this);
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
  async handleImport(e: React.FormEvent<HTMLInputElement>) {
    const file = e.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      const readerPromise: Promise<string> = new Promise(resolve => {
        reader.onload = ev => {
          resolve(reader.result);
        };
      });
      reader.readAsText(file);
      const text = await readerPromise;

      text
        .trim()
        .split('\n')
        .forEach((row, index) => {
          // Ignore header
          if (index === 0) {
            return;
          }

          // Parse each row
          const columns = JSON.parse('[' + row.trim() + ']');
          let [
            _id,
            _rev,
            number,
            date,
            category,
            name,
            location,
            amount,
            deleted
          ] = columns;

          // Convert to desired type
          number = parseInt(number, 10);
          amount = parseFloat(amount);
          deleted = !!(deleted === 'true');

          console.log(
            'row',
            _id,
            _rev,
            number,
            date,
            category,
            name,
            location,
            amount,
            deleted
          );
        });
    }
  }
  render() {
    return (
      <div className="backup">
        <div className="backup-title">Backup</div>
        <div className="backup-action">
          <button className="backup-export" onClick={this.handleExport}>
            Export as csv
          </button>

          <label className="backup-import">
            Import
            <input
              type="file"
              className="backup-import-input"
              onChange={this.handleImport}
            />
          </label>
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
