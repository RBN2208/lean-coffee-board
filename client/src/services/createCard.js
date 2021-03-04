export default function createCard(card) {
  return fetch('/api/cards', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(card),
  }).then(res => res.json())
}
