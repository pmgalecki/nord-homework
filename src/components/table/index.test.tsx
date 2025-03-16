import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Table, { Column } from '.';

type Row = { title: string; director: string; year: number };

const columns: Column<Row>[] = [
  {
    index: 'title',
    title: 'Title',
  },
  {
    index: 'director',
    title: 'Director',
  },
  {
    index: 'year',
    title: 'Year',
  },
];

const data: Row[] = [
  {
    title: 'Shawshank Redemption',
    director: 'Frank Darabont',
    year: 1994,
  },
  {
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    year: 1972,
  },
  {
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    year: 2008,
  },
];

describe('Table', () => {
  it('should render correct number of rows', () => {
    render(<Table columns={columns} data={data} />);

    const rows = screen.getAllByRole('row');
    const expectedLength = data.length + 1;

    expect(rows.length).toBe(expectedLength);
  });

  it('should render data correctly', () => {
    render(<Table columns={columns} data={data} />);

    const title = screen.getByText(/the godfather/i);

    expect(title).toBeInTheDocument();
  });

  it('should sort data descending by year', async () => {
    render(<Table columns={columns} data={data} />);

    const columnHead = screen.getByRole('button', { name: /year/i });
    const rows = screen.getAllByRole('row');
    const yearColumnFirstRow = rows[1].children[2];

    expect(yearColumnFirstRow).toContainHTML('<td>1994</td>');

    fireEvent.click(columnHead);

    const sortedRows = screen.getAllByRole('row');
    const sorterdYearColumnFirstRow = sortedRows[1].children[2];

    expect(sorterdYearColumnFirstRow).toContainHTML('<td>2008</td>');
  });
});
