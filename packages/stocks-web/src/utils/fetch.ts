export async function fetchGraphql(query: string) {
  const request = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      ['Content-Type']: 'application/json'
    },
    body: JSON.stringify({
      query
    })
  });
  const response = await request.json();
}
