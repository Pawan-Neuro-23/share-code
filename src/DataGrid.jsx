// src/MyAgGridTable.js
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const MyAgGridTable = () => {
  const [rowData, setRowData] = useState([
    { name: 'John Doe', age: 28, city: 'New York' },
    { name: 'Jane Smith', age: 32, city: 'Los Angeles' },
    { name: 'Michael Johnson', age: 45, city: 'Chicago' },
    { name: 'Emily Davis', age: 30, city: 'San Francisco' }
  ]);

  const [columnDefs] = useState([
    { headerName: 'Name', field: 'name', editable: true, resizable: true },
    { headerName: 'Age', field: 'age', editable: true, resizable: true },
    { headerName: 'City', field: 'city', editable: true, resizable: true }
  ]);

  const onCellValueChanged = (event) => {
    console.log('Row updated:', event.data);
    const updatedRowData = rowData.map(row =>
      row.name === event.data.name ? event.data : row
    );
    setRowData(updatedRowData);
  };

  return (
    <div className="container mx-auto my-10"> {/* Tailwind class to center and add margins */}
      <div className="bg-white shadow-md rounded-lg p-4" style={{ width: 'calc(100% - 20rem)', marginLeft: 'auto', marginRight: 'auto' }}>
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ resizable: true }}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
    </div>
  );
};

export default MyAgGridTable;