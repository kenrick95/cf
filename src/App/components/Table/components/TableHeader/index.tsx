import * as React from 'react';

function TableHeader() {
  return (
    <thead className="table-header">
      <tr>
        <th>#</th>
        <th>Date</th>
        <th>Category</th>
        <th>Name</th>
        <th>Location</th>
        <th>Amount</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
  );
}

export default TableHeader;
