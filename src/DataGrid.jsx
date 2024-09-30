import React, { useState, useRef } from 'react';

const DataGrid = () => {
  const [rows, setRows] = useState([
    { id: 1, col1: 'Row 1 Col 1', col2: 'Row 1 Col 2', col3: 'Row 1 Col 3' },
    { id: 2, col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
    { id: 3, col1: 'Row 3 Col 1', col2: 'Row 3 Col 2', col3: 'Row 3 Col 3' },
  ]);
  
  const [colWidths, setColWidths] = useState([200, 200, 200]);
  const resizeRef = useRef(null);
  const startX = useRef(0);
  const startWidth = useRef(0);
  
  const handleMouseDown = (index, e) => {
    resizeRef.current = index;
    startX.current = e.clientX;
    startWidth.current = colWidths[index];

    const handleMouseMove = (e) => {
      if (resizeRef.current !== null) {
        const newWidth = startWidth.current + (e.clientX - startX.current);
        if (newWidth > 100) { // Minimum width
          setColWidths((prevWidths) => {
            const updatedWidths = [...prevWidths];
            updatedWidths[resizeRef.current] = newWidth;
            return updatedWidths;
          });
        }
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      resizeRef.current = null;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleDelete = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleEdit = (id) => {
    const updatedRows = rows.map(row => 
      row.id === id ? { ...row, isEditing: !row.isEditing } : row
    );
    setRows(updatedRows);
  };

  const handleChange = (id, column, value) => {
    const updatedRows = rows.map(row => 
      row.id === id ? { ...row, [column]: value } : row
    );
    setRows(updatedRows);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {['Column 1', 'Column 2', 'Column 3'].map((header, index) => (
              <th
                key={index}
                className="border px-4 py-2 relative"
                style={{ width: colWidths[index] }}
              >
                {header}
                <div
                  onMouseDown={(e) => handleMouseDown(index, e)}
                  className="absolute right-0 h-full cursor-col-resize border-l-2 border-gray-500"
                  style={{ width: '10px', top: 0, right: 0 }}
                />
              </th>
            ))}
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              <td className="border px-4 py-2">
                {row.isEditing ? (
                  <input
                    type="text"
                    value={row.col1}
                    onChange={(e) => handleChange(row.id, 'col1', e.target.value)}
                    className="border rounded"
                  />
                ) : (
                  row.col1
                )}
              </td>
              <td className="border px-4 py-2">
                {row.isEditing ? (
                  <input
                    type="text"
                    value={row.col2}
                    onChange={(e) => handleChange(row.id, 'col2', e.target.value)}
                    className="border rounded"
                  />
                ) : (
                  row.col2
                )}
              </td>
              <td className="border px-4 py-2">
                {row.isEditing ? (
                  <input
                    type="text"
                    value={row.col3}
                    onChange={(e) => handleChange(row.id, 'col3', e.target.value)}
                    className="border rounded"
                  />
                ) : (
                  row.col3
                )}
              </td>
              <td className="border px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(row.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  {row.isEditing ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;