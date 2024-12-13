import React from 'react';
import './DynamicTable.css';

type TableProps<T> = {
  data: T[];
};

function DynamicTable<T>(props: TableProps<T>) {
  const { data } = props;

  if (data.length === 0) {
    return <p>No Data Available</p>;
  }

  //@ts-ignore
  const headers = Object.keys(data[0]) as (keyof T)[];

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={String(header)}>
                {String(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={String(header)}>
                  {row[header] as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;