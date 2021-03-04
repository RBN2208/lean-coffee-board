import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import getCards from '../services/getCards'
import postCard from '../services/postCard'
import Button from './Button'

export default function Board({ user }) {
  const [cards, setCards] = useState([])

  useEffect(() => {
    getCards().then(data => setCards([...data]))
  }, [])

  return (
    <BoardWrapper>
      <CardGrid>
        {cards.map(card => (
          <Card key={card._id}>
            {card.text}
            <footer>{card.author.name}</footer>
          </Card>
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
}

const BoardWrapper = styled.section`
  display: grid;
  grid-template-rows: auto 48px;
  height: inherit;
`

const CardGrid = styled.ul`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-auto-rows: 100px;
  margin: 0;
  padding: 20px;
  overflow-y: auto;
`

const Card = styled.li`
  display: grid;
  align-content: space-between;
  border-radius: 4px;
  padding: 20px 20px 10px 20px;
  color: #555;
  background: linear-gradient(#eee, #efefef);

  footer {
    text-transform: uppercase;
    font-size: 0.8em;
    text-align: end;
    color: hotpink;
  }
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
