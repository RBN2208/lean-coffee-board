export default function getCards(token) {
  return fetch('/cards', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.json())
}
