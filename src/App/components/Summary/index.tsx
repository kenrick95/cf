import * as React from 'react';

import { EntryDocument } from '../../types/entry';
import { ReduxStore } from '../../redux/reducers';

import { connect } from 'react-redux';
import { getEntries } from '../../redux/selector';

import { Doughnut } from 'react-chartjs-2';
import { groupBy } from '../../utils/groupBy';
import randomcolor from 'randomcolor';

import './style.scss';

interface PropsFromStore {
  entries: EntryDocument[];
}

interface Props extends PropsFromStore {}

interface State {}

class Summary extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    const { entries } = this.props;

    const groupedEntries = groupBy(entries, entry => entry.location);

    if (groupedEntries.size <= 0) {
      return null;
    }

    const data = {
      labels: Array.from(groupedEntries.keys()),
      datasets: [
        {
          data: Array.from(groupedEntries.values()).map(group => {
            return parseFloat(
              group
                .reduce((value, entry) => {
                  return value + entry.amount;
                }, 0)
                .toFixed(2)
            );
          }),
          backgroundColor: randomcolor({
            luminosity: 'light',
            hue: 'bright',
            count: groupedEntries.size
          })
        }
      ]
    };
    return (
      <div className="summary">
        <div className="summary-title">Amount grouped by location</div>
        <Doughnut data={data} />
      </div>
    );
  }
}

function mapStateToProps(state: ReduxStore): PropsFromStore {
  return {
    entries: getEntries(state.entries)
  };
}

export default connect<PropsFromStore>(mapStateToProps)(Summary);
