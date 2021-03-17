export default function getUsers() {
  return fetch('/users').then(res => res.json())
}
