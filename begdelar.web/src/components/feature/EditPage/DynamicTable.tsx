import React, { useState, useEffect, useRef } from 'react';
import './DynamicTable.css';

type ValidationRule = {
  maxLength: number;
  nullable: boolean;
};

type TableProps<T, V> = {
  data: T[];
  validationRules: V;
};

function DynamicTable<T, V extends Record<keyof T, ValidationRule>>(props: TableProps<T, V>) {
  const { data, validationRules } = props;
  const [currentData, setCurrentData] = useState<T[]>([...data]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleRows, setVisibleRows] = useState<T[]>([]);
  const [rowsToShow, setRowsToShow] = useState(50);
  const [dateRange, setDateRange] = useState<[string, string]>([
    '2017-01-01',
    new Date().toISOString().slice(0, 10),
  ]);
  const [editCell, setEditCell] = useState<{ rowIndex: number; colKey: keyof T } | null>(null);
  const [editedValue, setEditedValue] = useState<string>('');
  const [editedRows, setEditedRows] = useState<Set<number>>(new Set());
  const tableContainerRef = useRef<HTMLDivElement>(null);

  if (currentData.length === 0) {
    return <p>Datafel</p>;
  }

  const headers = Object.keys(currentData[0]) as (keyof T)[];

  const isDateInRange = (dateStr: string): boolean => {
    return dateStr >= dateRange[0] && dateRange[1] >= dateStr;
  };

  const applyFilters = () => {
    const searchFilteredData = currentData.filter(row =>
      headers.some(header => String(row[header]).toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const dateFilteredData = searchFilteredData.filter(row =>
      headers.some(header => isDateInRange(String(row[header])))
    );

    return dateFilteredData;
  };

  useEffect(() => {
    setVisibleRows(applyFilters().slice(0, rowsToShow));
  }, [searchTerm, dateRange, rowsToShow, currentData]);

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

  const handleCellClick = (rowIndex: number, colKey: keyof T, currentValue: string) => {
    setEditCell({ rowIndex, colKey });
    setEditedValue(currentValue || '');
  };

  const handleInputChange = (value: string) => {
    if (editCell) {
      const { maxLength, nullable } = validationRules[editCell.colKey];
      if (value.length > maxLength) {
        alert(`Kan inte vara större än ${maxLength} tecken.`);
        return;
      }
      if (!nullable && value.length === 0) {
        alert(`Detta fält får inte vara tomt.`);
        return;
      }
      setEditedValue(value);
    }
  };

  const applyEdit = () => {
    if (editCell && editedValue !== String(currentData[editCell.rowIndex][editCell.colKey])) {
      const updatedData = [...currentData];
      updatedData[editCell.rowIndex][editCell.colKey] = editedValue as T[keyof T];
      setCurrentData(updatedData);
      setEditCell(null);

      setEditedRows(prev => {
        const newSet = new Set(prev);
        newSet.add(editCell.rowIndex);
        return newSet;
      });

      setVisibleRows(applyFilters().slice(0, rowsToShow));
    } else {
      setEditCell(null);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyEdit();
    }
  };

  const handleUndoChanges = () => {
    window.location.reload();
  };

  const handleSaveChanges = () => {
    alert('Ändringar sparade');
  };

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
        <button onClick={handleUndoChanges} className="action-button">Ångra ändringar</button>
        <button onClick={handleSaveChanges} className="action-button">Spara ändringar</button>
      </div>
      <div ref={tableContainerRef} className="table-container" style={{ height: '82vh', overflowY: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={String(header)}>{String(header)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, rowIndex) => (
              <tr key={rowIndex} className={editedRows.has(rowIndex) ? 'edited-row' : ''}>
                {headers.map((header) => (
                  <td key={String(header)} onClick={() => handleCellClick(rowIndex, header, String(row[header]))}>
                    {editCell?.rowIndex === rowIndex && editCell?.colKey === header ? (
                      <input
                        className="table-input"
                        type="text"
                        value={editedValue}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        onBlur={applyEdit}
                        autoFocus
                      />
                    ) : (
                      String(row[header]) || <span className="placeholder">NULL</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="status-bar">{currentData.length.toLocaleString('sv-SE')} rader</div>
    </div>
  );
}

export default DynamicTable;
