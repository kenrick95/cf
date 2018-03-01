import * as React from 'react';
import { connect } from 'react-redux';
import { addEntry } from '../../../../redux/actions';
import { formatDate, ISO_8601_DATE_FORMAT } from '../../../../utils/date';

interface PropsFromActions {
  addEntry: typeof addEntry;
}
interface Props extends PropsFromActions {
  number: number;
}
interface State {
  date: string;
  category: string;
  name: string;
  location: string;
  amount: number;
}

class TableInput extends React.Component<Props> {
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
      amount: e.currentTarget.value
    });
  }
  handleSubmit() {
    const { date, category, name, location, amount } = this.state;
    const { number } = this.props;
    this.props.addEntry({
      number,
      date,
      category,
      name,
      location,
      amount,
      deleted: false
    });
  }

  render() {
    const { date, category, name, location, amount } = this.state;
    const { number } = this.props;
    return (
      <tr className="table-input">
        <td className="table-input__id">
          <input
            className="table-input__id"
            type="number"
            disabled
            value={number}
          />
        </td>
        <td className="table-input__date">
          <input
            className="table-input__date-input"
            type="date"
            required
            value={date}
            onChange={this.handleDateChanged}
          />
        </td>
        <td className="table-input__category">
          <input
            className="table-input__category-input"
            type="text"
            required
            value={category}
            onChange={this.handleCategoryChanged}
          />
        </td>
        <td className="table-input__name">
          <input
            className="table-input__name-input"
            type="text"
            required
            value={name}
            onChange={this.handleNameChanged}
          />
        </td>
        <td className="table-input__location">
          <input
            className="table-input__location-input"
            type="text"
            required
            value={location}
            onChange={this.handleLocationChanged}
          />
        </td>
        <td className="table-input__amount">
          <input
            className="table-input__amount-input"
            type="number"
            step="0.01"
            min="0.00"
            required
            value={amount}
            onChange={this.handleAmountChanged}
          />
        </td>
        <td className="table-input__action">
          <button type="submit" onClick={this.handleSubmit}>
            Submit
          </button>
        </td>
      </tr>
    );
  }
}

export default connect(undefined, { addEntry })(TableInput);
