import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import deleteCard from '../services/deleteCard'
import getCards from '../services/getCards'
import postCard from '../services/postCard'
import voteCard from '../services/voteCard'
import Button from './Button'
import Card from './Card'

Board.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    token: PropTypes.string,
    id: PropTypes.string,
  }),
  onLogout: PropTypes.func,
}

export default function Board({ user, onLogout, onError }) {
  const [cards, setCards] = useState([])

  useEffect(() => {
    getCards(user.token)
      .then(data => setCards([...data]))
      .catch(onError)
  }, [user.token, onError])

  return (
    <BoardWrapper>
      <Logout onClick={onLogout} />
      <CardGrid>
        {cards
          .sort((a, b) => b.votes - a.votes)
          .map((card, index) => (
            <Card
              key={card._id}
              authorColor={card.author?.color}
              text={card.text}
              author={card.author?.username}
              votes={card.votes}
              onDelete={() => handleDelete(card._id)}
              onVote={() => handleVote(index)}
            />
          ))}
        <Spacer />
      </CardGrid>
      <Form onSubmit={handleSubmit}>
        <input
          autoFocus
          placeholder={`${user.username} says ... `}
          name="text"
        />
        <Button>Add Card</Button>
      </Form>
    </BoardWrapper>
  )

  function handleVote(index) {
    const card = cards[index]

    // optimistic update
    setCards([
      ...cards.slice(0, index),
      { ...card, votes: card.votes + 1 },
      ...cards.slice(index + 1),
    ])

    // we use finally here to get the cards in both cases: if the update returned
    // successfully or with an error:
    voteCard(card._id, user.token).finally(() => {
      getCards(user.token).then(cards => setCards(cards))
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const form = event.target
    const { text } = form.elements
    postCard({ text: text.value, author: user.id }, user.token)
      .then(newCard => setCards([newCard, ...cards]))
      .catch(onError)
    form.reset()
    text.focus()
  }

  function handleDelete(id) {
    deleteCard(id, user.token).then(() => {
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
  align-content: start;
  /* grid-auto-rows: 100px; */
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
