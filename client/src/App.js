import { useState, useEffect } from 'react'
import createCard from './services/createCard'
import getCards from './services/getCards'
import getUsers from './services/getUsers'

function App() {
  const [users, setUsers] = useState([])
  const [cards, setCards] = useState([])

  useEffect(() => {
    getUsers().then(data => setUsers([...data]))
  }, [])

  useEffect(() => {
    getCards().then(data => setCards([...data]))
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const { text, author } = form.elements
    createCard({ text: text.value, author: author.value }).then(newCard =>
      setCards([newCard, ...cards])
    )
  }

  return (
    <div>
      <h2>Users:</h2>
      {users.map(user => (
        <div key={user._id}>
          {user.name} ({user._id})
        </div>
      ))}
      <h2>Cards:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Text:
          <br />
          <input name="text" />
        </label>
        <label>
          Author ID:
          <br />
          <input name="author" />
        </label>
        <button>Create card</button>
      </form>
      {cards.map(card => (
        <div key={card._id}>
          {card.text} ({card.author.name})
        </div>
      ))}
    </div>
  )
}

export default App
