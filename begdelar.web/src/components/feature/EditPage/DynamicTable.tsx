import React, { useState, useEffect, useRef } from 'react';
import './DynamicTable.css';
import { ScaniaErrorBasic } from '../../ui/alerts/ScaniaErrorBasic';
import { updateUPricefileManuals } from '../../../services/apiEndpoints';

type ValidationRule = {
  maxLength: number;
  nullable: boolean;
};

type TableProps<T, V> = {
  data: T[];
  validationRules: V;
};

function DynamicTable<T extends { Id: string }, V extends Record<keyof T, ValidationRule>>(props: TableProps<T, V>) {
  const { data, validationRules } = props;
  const [currentData, setCurrentData] = useState<T[]>([...data]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleRows, setVisibleRows] = useState<T[]>([]);
  const [rowsToShow, setRowsToShow] = useState(50);
  const [dateRange, setDateRange] = useState<[string, string]>(['2017-01-01', new Date().toISOString().slice(0, 10)]);
  const [editCell, setEditCell] = useState<{ key: string; colKey: keyof T } | null>(null);
  const [editedValue, setEditedValue] = useState<string>('');
  const [editedRows, setEditedRows] = useState<Set<string>>(new Set());
  const tableContainerRef = useRef<HTMLDivElement>(null);

  if (currentData.length === 0) {
    return <ScaniaErrorBasic errMessage='Datafel'/>;
  }

  const headers = Object.keys(currentData[0]).filter(header => header !== 'Id') as (keyof T)[];

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

  const handleCellClick = (rowKey: string, colKey: keyof T, currentValue: string) => {
    setEditCell({ key: rowKey, colKey });
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
    if (
      editCell &&
      editedValue !== String(currentData.find(row => row.Id === editCell.key)?.[editCell.colKey])
    ) {
      const updatedData = currentData.map(row =>
        row.Id === editCell.key ? { ...row, [editCell.colKey]: editedValue as T[keyof T] } : row
      );
      setCurrentData(updatedData);
      setEditCell(null);

      setEditedRows(prev => new Set([...prev, editCell.key]));
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

  const handleSaveChanges = async () => {
    const updatedRows = currentData.filter(row => editedRows.has(row.Id));
  
    if (updatedRows.length === 0) {
      alert('Inga ändringar att spara');
      return;
    }
  
    console.log("PUT Request Object:", updatedRows);
  
    try {
      await updateUPricefileManuals(updatedRows)
    } catch (err) {
      alert(`${err}`);
    }
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
      <div ref={tableContainerRef} className="table-container">
        <table className="table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={String(header)}>{String(header)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr
                key={row.Id}
                className={editedRows.has(row.Id) ? 'edited-row' : ''}
              >
                {headers.map((header) => (
                  <td
                    key={String(header)}
                    onClick={() => handleCellClick(row.Id, header, String(row[header]))}
                  >
                    {editCell?.key === row.Id && editCell?.colKey === header ? (
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