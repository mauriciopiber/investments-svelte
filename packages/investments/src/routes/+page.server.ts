export async function load() {
  const request = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      ['Content-Type']: 'application/json'
    },
    body: JSON.stringify({
      query: `
      query {
        stocks {

          ticket
        }
      }

    `
    })
  });
  const response = await request.text();

  console.log(response);
  return {
    title: 'Piber'
  };
}
