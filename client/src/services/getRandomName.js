export default function getRandomName() {
  const index = Math.floor(Math.random() * 670)
  return fetch('https://rickandmortyapi.com/api/character/' + index)
    .then(res => res.json())
    .then(character => character.name)
    .catch(error => Promise.resolve(''))
}
