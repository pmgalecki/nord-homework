import { Table } from '../../components';

import { Server } from '.';

function ServersList({ servers }: { servers: Server[] }) {
  return (
    <Table
      data={servers}
      columns={[
        { index: 'name', title: 'Name' },
        { index: 'distance', title: 'Distance' },
      ]}
    />
  );
}

export default ServersList;
