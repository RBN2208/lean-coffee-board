import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import deleteCard from '../services/deleteCard'
import getCards from '../services/getCards'
import postCard from '../services/postCard'
import Button from './Button'
import Card from './Card'

export default function Board({ user, onLogout }) {
  const [cards, setCards] = useState([])

  useEffect(() => {
    getCards().then(data => setCards([...data]))
  }, [])

  return (
    <BoardWrapper>
      <Logout onClick={onLogout} />
      <CardGrid>
        {cards.map(card => (
          <Card
            key={card._id}
            authorColor={card.author?.color}
            text={card.text}
            name={card.author?.name}
            onDelete={() => handleDelete(card._id)}
          />
        ))}
        <Spacer />
      </CardGrid>
      <Form onSubmit={handleSubmit}>
        <input autoFocus placeholder={`${user.name} says ... `} name="text" />
        <Button>Add Card</Button>
      </Form>
    </BoardWrapper>
  )

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const { text } = form.elements
    postCard({ text: text.value, author: user._id }).then(newCard =>
      setCards([newCard, ...cards])
    )
    form.reset()
    text.focus()
  }

  function handleDelete(id) {
    deleteCard(id).then(() => {
      const updatedCards = cards.filter(card => card._id !== id)
      setCards([...updatedCards])
    })
  }
}

const BoardWrapper = styled.section`
  display: grid;
  grid-template-rows: min-content auto 48px;
  height: inherit;
`

const Logout = styled.small.attrs(() => ({ children: 'Logout' }))`
  cursor: default;
  text-align: right;
  padding: 8px 20px 0;
  color: #666;

  &:hover {
    color: plum;
  }
`

const CardGrid = styled.ul`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 400px));
  grid-auto-rows: 100px;
  margin: 0;
  padding: 20px;
  overflow-y: auto;
`

const Spacer = styled.li.attrs(() => ({ ariaHidden: 'true' }))`
  visibility: hidden;
  height: 20px;
`

const Form = styled.form`
  display: flex;
  width: 100%;

  button {
    flex: 1 0 max-content;
    border-radius: 0;
    padding: 0 20px;
  }
`
