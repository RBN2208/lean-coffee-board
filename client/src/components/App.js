import { useState, useEffect } from 'react'
import LeanCards from './LeanCards'
import getUsers from '../services/getUsers'
import getCards from '../services/getCards'
import createCard from '../services/createCard'
import Form from './Form'
import styled from 'styled-components'

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
    createCard({ text: text.value, author: author.value }).then(() => {
      getCards().then(data => setCards([...data]))
    })
  }

  return (
    <AppGrid>
      <Form onSubmitClick={handleSubmit} />
      <div>
        {cards.map(({ text, author }) => (
          <LeanCards text={text} author={author} />
        ))}
      </div>
    </AppGrid>
  )
}

export default App

const AppGrid = styled.div`
  margin: 0;
  display: grid;
  grid-template-columns: max-content;
  background-color: whitesmoke;
`
