import React from 'react';

class TableFooter extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { total } = this.props;
    return (
      <tfoot className="table-header">
        <tr>
          <td colSpan="5">&nbsp;</td>
          <td>{total}</td>
          <td>&nbsp;</td>
        </tr>
      </tfoot>
    );
  }
}

export default TableFooter;
