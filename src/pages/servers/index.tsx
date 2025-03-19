import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { getData } from '../../data/get-data';

import ServersList from './list';

export type Server = { name: string; distance: number };

function Servers() {
  const { data, isLoading } = useQuery<Server[]>({
    queryKey: ['servers'],
    queryFn: () => getData('servers'),
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
  });

  return (
    <Layout>
      <h1>Servers</h1>
      {isLoading && <h2>Loading data...</h2>}
      {data && <ServersList servers={data} />}
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 25px;

  h1 {
    margin-bottom: 25px;
  }
`;

export default Servers;
