import * as React from "react";

interface Props {
  total: number;
}

class TableFooter extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { total } = this.props;
    return (
      <tfoot className="table-header">
        <tr>
          <td colSpan={5}>&nbsp;</td>
          <td>{total}</td>
          <td>&nbsp;</td>
        </tr>
      </tfoot>
    );
  }
}

export default TableFooter;
