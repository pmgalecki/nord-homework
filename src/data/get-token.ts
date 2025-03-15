const baseUrl = 'https://playground.tesonet.lt/v1';

type TokenResponse = { token: string };

async function getToken(username: string, password: string) {
  let token: string | undefined;
  let error: string | undefined;

  try {
    const response = await fetch(`${baseUrl}/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error();
    }

    const data = (await response.json()) as TokenResponse;
    token = data.token;
  } catch {
    error = 'Failed to login';
  }

  return { token, error };
}

export { getToken };
