export default function postUser(user) {
  return fetch('/auth/local/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then(data => (data.error ? Promise.reject(data) : data))
}
