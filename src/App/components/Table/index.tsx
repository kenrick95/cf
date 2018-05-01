import * as React from 'react';
import { connect } from 'react-redux';
import TableHeader from './components/TableHeader';
import TableEntry from './components/TableEntry';
import TableInput from './components/TableInput';
import TableFooter from './components/TableFooter';

import { EntryDocument } from '../../types/entry';
import { ReduxStore } from '../../redux/reducers';
import { addEntry, updateEntry } from '../../redux/actions';
import { formatDate, ISO_8601_DATE_FORMAT } from '../../utils/date';
import {
  getNamesFromEntries,
  getCategoriesFromEntries,
  getLocationsFromEntries
} from './components/TableInput/util';

import './style.scss';
import { getEntries } from '../../redux/selector';

interface PropsFromStore {
  entries: EntryDocument[];
  unfilteredEntriesLength: number;
}

interface PropsFromActions {
  addEntry: typeof addEntry;
  updateEntry: typeof updateEntry;
}
interface Props extends PropsFromStore, PropsFromActions {}

interface State {
  date: string;
  category: string;
  name: string;
  location: string;
  amount: number;
  editingEntryIndex: number;
}

class Table extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChanged = this.handleDateChanged.bind(this);
    this.handleCategoryChanged = this.handleCategoryChanged.bind(this);
    this.handleNameChanged = this.handleNameChanged.bind(this);
    this.handleLocationChanged = this.handleLocationChanged.bind(this);
    this.handleAmountChanged = this.handleAmountChanged.bind(this);
    this.handleEntryEditing = this.handleEntryEditing.bind(this);
    this.state = {
      date: formatDate(new Date(), ISO_8601_DATE_FORMAT),
      category: '',
      name: '',
      location: '',
      amount: 0,
      editingEntryIndex: this.props.unfilteredEntriesLength
    };
  }
  resetInput() {
    this.setState({
      date: formatDate(new Date(), ISO_8601_DATE_FORMAT),
      category: '',
      name: '',
      location: '',
      amount: 0,
      editingEntryIndex: this.props.unfilteredEntriesLength
    });
  }
  handleDateChanged(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      date: formatDate(new Date(e.currentTarget.value), ISO_8601_DATE_FORMAT)
    });
  }
  handleCategoryChanged(newValue: string) {
    this.setState({
      category: newValue
    });
  }
  handleNameChanged(newValue: string) {
    this.setState({
      name: newValue
    });
  }
  handleLocationChanged(newValue: string) {
    this.setState({
      location: newValue
    });
  }
  handleAmountChanged(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      amount: parseFloat(e.currentTarget.value)
    });
  }
  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const {
      date,
      category,
      name,
      location,
      amount,
      editingEntryIndex
    } = this.state;

    if (editingEntryIndex === this.props.unfilteredEntriesLength) {
      this.props.addEntry({
        number: editingEntryIndex + 1,
        date,
        category,
        name,
        location,
        amount,
        deleted: false
      });
    } else {
      const { _id, _rev, number } = this.props.entries[editingEntryIndex];
      this.props.updateEntry({
        number,
        date,
        category,
        name,
        location,
        amount,
        deleted: false,
        _id,
        _rev
      });
    }

    this.resetInput();
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.unfilteredEntriesLength !== prevProps.unfilteredEntriesLength
    ) {
      this.setState({
        editingEntryIndex: this.props.unfilteredEntriesLength
      });
    }
  }

  handleEntryEditing(index: number) {
    const { entries } = this.props;
    const entry = entries[index];
    if (!entry) {
      return;
    }
    const { date, category, name, location, amount } = entry;

    this.setState({
      editingEntryIndex: index,
      date,
      category,
      name,
      location,
      amount
    });
  }

  render() {
    const { entries, unfilteredEntriesLength } = this.props;
    const {
      date,
      category,
      name,
      location,
      amount,
      editingEntryIndex
    } = this.state;
    const number =
      unfilteredEntriesLength === editingEntryIndex
        ? unfilteredEntriesLength + 1
        : entries[editingEntryIndex]
          ? entries[editingEntryIndex].number
          : unfilteredEntriesLength + 1;

    const inputComponent = (
      <TableInput
        key="edit"
        handleDateChanged={this.handleDateChanged}
        handleCategoryChanged={this.handleCategoryChanged}
        handleNameChanged={this.handleNameChanged}
        handleLocationChanged={this.handleLocationChanged}
        handleAmountChanged={this.handleAmountChanged}
        number={number}
        date={date}
        category={category}
        name={name}
        location={location}
        amount={amount}
        deleted={false}
        autocompleteCategories={getCategoriesFromEntries(entries)}
        autocompleteNames={getNamesFromEntries(entries)}
        autocompleteLocations={getLocationsFromEntries(entries)}
      />
    );

    return (
      <form onSubmit={this.handleSubmit}>
        <table className="table">
          <TableHeader />
          <tbody>
            {entries.map((entry, index) => {
              if (index === editingEntryIndex) {
                return inputComponent;
              }
              return (
                <TableEntry
                  key={entry._id}
                  {...entry}
                  index={index}
                  onDoubleClick={this.handleEntryEditing}
                />
              );
            })}
          </tbody>
          <tbody>
            {unfilteredEntriesLength === editingEntryIndex ? inputComponent : null}
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
    entries: getEntries(state.entries),
    unfilteredEntriesLength: state.entries.items.length
  };
}

export default connect<PropsFromStore, PropsFromActions>(mapStateToProps, {
  addEntry,
  updateEntry
})(Table);
