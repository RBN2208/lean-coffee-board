export default function postCard(card, token) {
  return fetch('/cards', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(card),
  })
    .then(res => res.json())
    .then(data => (data.error ? Promise.reject(data) : data))
}
