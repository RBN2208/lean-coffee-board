export default function loginUser({ identifier, password }) {
  return fetch('/auth/local', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ identifier, password }),
  })
    .then(res => res.json())
    .then(data => (data.error ? Promise.reject(data) : data))
}
