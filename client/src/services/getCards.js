export default function getCards() {
  return fetch('/cards').then(res => res.json())
}
