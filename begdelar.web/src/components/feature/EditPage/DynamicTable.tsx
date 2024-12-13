import React, { useState, useEffect, useRef } from 'react';
import './DynamicTable.css';

type TableProps<T> = {
  data: T[];
};

function DynamicTable<T>(props: TableProps<T>) {
  const { data } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleRows, setVisibleRows] = useState<T[]>([]);
  const [rowsToShow, setRowsToShow] = useState(50);
  const tableContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setVisibleRows(filteredData.slice(0, rowsToShow));
  }, [filteredData, rowsToShow]);

  const handleScroll = () => {
    const container = tableContainerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 10 && rowsToShow < filteredData.length) {
        setRowsToShow(prev => Math.min(prev + 50, filteredData.length));
      }
    }
  };

  useEffect(() => {
    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [filteredData.length, rowsToShow]);

  return (
    <div className="table-wrapper">
      <input
        type="text"
        placeholder="Sök..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setRowsToShow(50);
        }}
        className="search-bar"
      />
      <div ref={tableContainerRef} className="table-container" style={{ height: '95vh', overflowY: 'auto' }}>
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
            {visibleRows.map((row, index) => (
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
    </div>
  );
}

export default DynamicTable;
