export default function getUsers() {
  return fetch('/api/users').then(res => res.json())
}
