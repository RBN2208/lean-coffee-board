export default function postCard(card) {
  return fetch('/api/cards', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(card),
  })
    .then(res => res.json())
    .then(data => (data.error ? Promise.reject(data) : data))
}
