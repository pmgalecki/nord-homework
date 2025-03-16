import { useQuery } from '@tanstack/react-query';
import { getData } from '../../data/get-data';

import ServersList from './list';

export type Server = { name: string; distance: number };

function Servers() {
  const { data, isLoading, refetch } = useQuery<Server[]>({
    queryKey: ['servers'],
    queryFn: () => getData('servers'),
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <h1>Servers</h1>
      <button onClick={() => refetch()}>Refresh list</button>
      {isLoading && <h2>Loading data...</h2>}
      {data && <ServersList servers={data} />}
    </div>
  );
}

export default Servers;
