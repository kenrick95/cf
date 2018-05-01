import * as React from 'react';

import Filter from './components/Filter';
import Backup from './components/Backup';

import './style.scss';

interface Props {}

class Settings extends React.Component<Props> {
  render() {
    return (
      <div className="settings">
        <div className="settings-title">Settings</div>
        <div className="settings-list">
          <Filter />
          <Backup />
        </div>
      </div>
    );
  }
}

export default Settings;
