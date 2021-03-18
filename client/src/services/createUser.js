export default function createUser({ username, email, password }) {
  return fetch('/auth/local/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  }).then(res => res.json())
}
