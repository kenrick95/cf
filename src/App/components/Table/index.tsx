import * as React from 'react';
import { connect } from 'react-redux';
import TableHeader from './components/TableHeader';
import TableEntry from './components/TableEntry';
import TableInput from './components/TableInput';
import TableFooter from './components/TableFooter';

import { EntryDocument } from '../../types/entry';
import { ReduxStore } from '../../redux/reducers';
import { addEntry } from '../../redux/actions';
import { formatDate, ISO_8601_DATE_FORMAT } from '../../utils/date';

import './style.scss';

interface PropsFromStore {
  entries: EntryDocument[];
}

interface PropsFromActions {
  addEntry: typeof addEntry;
}
interface Props extends PropsFromStore, PropsFromActions {}

interface State {
  date: string;
  category: string;
  name: string;
  location: string;
  amount: number;
}

class Table extends React.Component<Props> {
  state: State;
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChanged = this.handleDateChanged.bind(this);
    this.handleCategoryChanged = this.handleCategoryChanged.bind(this);
    this.handleNameChanged = this.handleNameChanged.bind(this);
    this.handleLocationChanged = this.handleLocationChanged.bind(this);
    this.handleAmountChanged = this.handleAmountChanged.bind(this);
    this.state = {
      date: formatDate(new Date(), ISO_8601_DATE_FORMAT),
      category: '',
      name: '',
      location: '',
      amount: 0
    };
  }
  resetInput() {
    this.setState({
      date: formatDate(new Date(), ISO_8601_DATE_FORMAT),
      category: '',
      name: '',
      location: '',
      amount: 0
    });
  }
  handleDateChanged(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      date: formatDate(new Date(e.currentTarget.value), ISO_8601_DATE_FORMAT)
    });
  }
  handleCategoryChanged(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      category: e.currentTarget.value
    });
  }
  handleNameChanged(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      name: e.currentTarget.value
    });
  }
  handleLocationChanged(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      location: e.currentTarget.value
    });
  }
  handleAmountChanged(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      amount: parseFloat(e.currentTarget.value)
    });
  }
  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { date, category, name, location, amount } = this.state;
    this.props.addEntry({
      number: this.props.entries.length + 1,
      date,
      category,
      name,
      location,
      amount,
      deleted: false
    });
    this.resetInput();
  }
  render() {
    const { entries} = this.props;
    const { date, category, name, location, amount } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <table className="table">
          <TableHeader />
          <tbody>
            {entries.map(entry => {
              return <TableEntry key={entry._id} {...entry} />;
            })}
          </tbody>
          <tbody>
            <TableInput
              number={entries.length + 1}
              handleDateChanged={this.handleDateChanged}
              handleCategoryChanged={this.handleCategoryChanged}
              handleNameChanged={this.handleNameChanged}
              handleLocationChanged={this.handleLocationChanged}
              handleAmountChanged={this.handleAmountChanged}
              date={date}
              category={category}
              name={name}
              location={location}
              amount={amount}
              deleted={false}
            />
          </tbody>
          <TableFooter
            total={entries.reduce(
              (previousValue: number, entry: EntryDocument) =>
                previousValue + entry.amount,
              0
            )}
          />
        </table>
      </form>
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

export default connect(mapStateToProps, { addEntry })(Table);