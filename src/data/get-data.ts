import { BASE_URL } from '../constants';

async function getData<Data>(path: string): Promise<Data> {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

export { getData };
