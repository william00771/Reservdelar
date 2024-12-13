import React, { useState } from 'react';
import './DynamicTable.css';

type TableProps<T> = {
  data: T[];
};

function DynamicTable<T>(props: TableProps<T>) {
  const { data } = props;
  const [searchTerm, setSearchTerm] = useState('');

  if (data.length === 0) {
    return <p>Datafel</p>;
  }

  //@ts-ignore
  const headers = Object.keys(data[0]) as (keyof T)[];

  const filteredData = data.filter(row =>
    headers.some(header =>
      String(row[header]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Sök..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
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
          {filteredData.map((row, index) => (
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