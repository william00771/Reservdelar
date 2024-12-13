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
  const [dateRange, setDateRange] = useState<[string, string]>(['2017-01-01', new Date().toISOString().slice(0, 10)]);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  if (data.length === 0) {
    return <p>Datafel</p>;
  }

  //@ts-ignore
  const headers = Object.keys(data[0]) as (keyof T)[];

  const isDateInRange = (dateStr: string): boolean => {
    return dateStr >= dateRange[0] && dateStr <= dateRange[1];
  };

  const applyFilters = () => {
    const searchFilteredData = data.filter(row =>
      headers.some(header => String(row[header]).toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const dateFilteredData = searchFilteredData.filter(row =>
      headers.some(header => isDateInRange(String(row[header])))
    );

    return dateFilteredData;
  };

  useEffect(() => {
    setVisibleRows(applyFilters().slice(0, rowsToShow));
  }, [searchTerm, dateRange, rowsToShow, data]);

  const handleScroll = () => {
    const container = tableContainerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 10 && rowsToShow < applyFilters().length) {
        setRowsToShow(prev => Math.min(prev + 50, applyFilters().length));
      }
    }
  };

  useEffect(() => {
    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [applyFilters().length, rowsToShow]);

  return (
    <div className="table-wrapper">
      <div className="menu-wrapper">
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
        {/* <span>Från: {dateRange[0]}</span> */}
        {/* <span>Till: {dateRange[1]}</span> */}
        <input
          type="date"
          min="2019-01-01"
          max="2030-01-01"
          value={dateRange[0]}
          onChange={(e) => setDateRange([e.target.value, dateRange[1]])}
          className="date-input"
        />
        <input
          type="date"
          min="2019-01-01"
          max="2030-01-01"
          value={dateRange[1]}
          onChange={(e) => setDateRange([dateRange[0], e.target.value])}
          className="date-input"
        />
      </div>
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