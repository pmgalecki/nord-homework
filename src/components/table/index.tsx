import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { SortIcon } from './sort-icon';

export interface Column<DataType> {
  index: keyof DataType;
  title: string;
}

export type Order = 'asc' | 'desc';

interface TableProps<DataType> {
  data: DataType[];
  columns: Column<DataType>[];
}

type Properties<T> = keyof T;

const getNextOrder = (order: Order | undefined): Order => {
  if (!order) return 'desc';
  return order == 'asc' ? 'desc' : 'asc';
};

const ROWS_PER_PAGE = 10;

const getRangeArray = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => i + 1);

function Table<DataType extends object>({
  data,
  columns,
}: TableProps<DataType>) {
  const [rows, setRows] = useState<DataType[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<{
    column: Column<DataType>['index'];
    order: Order;
  }>();

  const visibleRows = rows.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    ROWS_PER_PAGE * currentPage,
  );

  const pagesCount = Math.ceil(rows.length / ROWS_PER_PAGE);
  const pages = useMemo(() => getRangeArray(1, pagesCount), [pagesCount]);

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

  return (
    <>
      <StyledTable>
        <colgroup>
          <col span={1} style={{ width: 50 }} />
          <col span={1} style={{ width: 50 }} />
        </colgroup>
        <thead>
          <tr>
            {columns.map((col) => {
              return (
                <td key={uuid()}>
                  <ColumnHeader onClick={() => handleSort(col.index)}>
                    {col.title}
                    {sort?.column === col.index && (
                      <SortIcon order={sort.order} />
                    )}
                  </ColumnHeader>
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row) => {
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
      <PaginationContainer>
        {pages.map((page) => (
          <PageButton
            $currentPage={page == currentPage}
            key={page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </PageButton>
        ))}
      </PaginationContainer>
    </>
  );
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
`;

const PageButton = styled.span<{ $currentPage: boolean }>`
  font-weight: ${({ $currentPage }) => ($currentPage ? 600 : 500)};
  font-size: ${({ $currentPage }) => ($currentPage ? '20px' : '16px')};
  color: ${({ $currentPage }) => ($currentPage ? 'var(--purple)' : 'black')};

  cursor: pointer;
  padding: 7px 14px;
  border-radius: 15px;
  }
`;

const ColumnHeader = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 600;
  gap: 5px;

  &:hover {
    color: var(--purple);
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 5px;
  table-layout: fixed;

  tbody {
    tr {
      background-color: white;
      line-height: 35px;

      td {
        max-height: 56px;
        padding: 0 10px;
        font-weight: 500;

        &:first-child {
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }

        &:last-child {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
    }
  }
`;

export { Table };
