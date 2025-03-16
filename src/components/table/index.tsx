import { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

export interface Column<DataType> {
  index: keyof DataType;
  title: string;
}

type Order = 'asc' | 'desc';

interface TableProps<DataType> {
  data: DataType[];
  columns: Column<DataType>[];
}

type Properties<T> = keyof T;

const getNextOrder = (order: Order | undefined): Order => {
  if (!order) return 'desc';
  return order == 'asc' ? 'desc' : 'asc';
};

function Table<DataType extends object>({
  data,
  columns,
}: TableProps<DataType>) {
  const [rows, setRows] = useState<DataType[]>(data);
  const [sort, setSort] = useState<{
    column: Column<DataType>['index'];
    order: Order;
  }>();

  const handleSort = (index: Properties<DataType>) => {
    setSort({ column: index, order: getNextOrder(sort?.order) });

    if (typeof rows[0][index] == 'string') {
      setRows([
        ...rows.sort((a, b) => {
          const aIndex = a[index] as string;
          const bIndex = b[index] as string;

          return sort?.order == 'desc'
            ? aIndex.localeCompare(bIndex)
            : bIndex.localeCompare(aIndex);
        }),
      ]);
    } else if (typeof rows[0][index] == 'number') {
      setRows([
        ...rows.sort((a, b) => {
          const aValue = a[index] as number;
          const bValue = b[index] as number;

          return sort?.order == 'desc' ? aValue - bValue : bValue - aValue;
        }),
      ]);
    }
  };

  const sortArrow = (order: Order) => {
    return order == 'asc' ? <span>&#8593;</span> : <span>&#8595;</span>;
  };

  const handleSearch = (searchString: string) => {
    const filtered = rows.filter((row) => {
      const current = Object.values(row)[0];

      return current.startsWith(searchString);
    });

    setRows(filtered);
  };

  return (
    <>
      <input onChange={(e) => handleSearch(e.target.value)} />
      <StyledTable>
        <thead>
          <tr>
            {columns.map((col) => {
              return (
                <td key={uuid()}>
                  <button
                    onClick={() => handleSort(col.index)}
                    style={{ cursor: 'pointer' }}
                  >
                    {col.title}
                    {sort?.column === col.index && sortArrow(sort.order)}
                  </button>
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const keys = Object.keys(row) as Properties<DataType>[];

            return (
              <tr key={uuid()}>
                {keys.map((key) => (
                  <td key={uuid()}>{String(row[key])}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </>
  );
}

const StyledTable = styled.table`
  width: 600px;

  tbody {
    tr {
      background-color: white;
      color: #333;
    }
  }
`;

export default Table;
