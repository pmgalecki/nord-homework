import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { Server } from '.';

function ServersList({ servers }: { servers: Server[] }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Distance</th>
        </tr>
      </thead>
      <tbody>
        {servers.map((server) => {
          return (
            <tr key={uuid()}>
              <td>{server.name}</td>
              <td>{server.distance}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  tbody {
    tr {
      background-color: white;
      color: #333;
    }
  }
`;

export default ServersList;
