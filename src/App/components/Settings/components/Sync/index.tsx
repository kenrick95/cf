import * as React from 'react';

import './style.scss';
import { PouchDbContext } from '../../../../context';
import { withContext } from '../../../../utils/withContext';

import PouchDB from 'pouchdb-browser';

interface Props {
  context: typeof PouchDB;
}

interface State {
  remoteDb: string;
  syncStatus: string;
}

@withContext(PouchDbContext.Consumer)
class Sync extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      syncStatus: '',
      remoteDb: 'http://localhost:5984/cf2'
    };
  }
  handleTargetChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      remoteDb: e.currentTarget.value
    });
  };
  handleSubmitSync = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.remoteDb) {
      const db = this.props.context;
      const remoteDb = new PouchDB(this.state.remoteDb);
      this.setState({
        syncStatus: 'Syncing'
      });
      db.sync(remoteDb)
        .on('paused', (err: any) => {
          console.warn('Sync paused', err);
          this.setState({
            syncStatus: 'Sync paused'
          });
        })
        .on('active', () => {
          this.setState({
            syncStatus: 'Syncing'
          });
        })
        .on('complete', () => {
          this.setState({
            syncStatus: 'Sync done'
          });
        })
        .on('denied', (err: any) => {
          console.error('Sync denied', err);
          this.setState({
            syncStatus: 'Sync denied'
          });
        })
        .on('error', (err: any) => {
          console.error('Sync error', err);
          this.setState({
            syncStatus: 'Sync error'
          });
        });
    }
  };
  render() {
    return (
      <form className="sync" onSubmit={this.handleSubmitSync}>
        <div className="sync-title">Sync (2-way)</div>
        <label className="sync-target">
          Remote DB:
          <br />
          <input
            type="url"
            className="sync-target-input"
            onChange={this.handleTargetChange}
            value={this.state.remoteDb}
          />
        </label>
        {this.state.syncStatus ? (
          <div className="sync-status">{this.state.syncStatus}</div>
        ) : null}
        <button className="sync-action">Sync</button>
      </form>
    );
  }
}

export default Sync;
