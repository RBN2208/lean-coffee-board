export default function loginUser(user) {
  return fetch('/auth/local', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then(data => (data.error ? Promise.reject(data) : data))
}
