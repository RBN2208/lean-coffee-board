export default function deleteCard(id, token) {
  return fetch(`/cards/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => (data.error ? Promise.reject(data) : data))
}
