import { useState, useEffect } from 'react'
import LeanCards from './LeanCards'
import getUsers from '../services/getUsers'
import getCards from '../services/getCards'
import createCard from '../services/createCard'
import Form from './Form'
import styled from 'styled-components/macro'
import Header from './Header'

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
    <AppContainer>
      <HeaderContainer>
        <Header>The new Lean Coffee Board!</Header>
      </HeaderContainer>
      <Content>
        {cards.map(({ text, author }) => (
          <LeanCards text={text} author={author} />
        ))}
      </Content>
      <div>
        <Form onSubmitClick={handleSubmit} />
      </div>
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 75px auto 70px;
  margin: 0;
  background-color: whitesmoke;
`
const HeaderContainer = styled.div`
  display: flex;
`

const Content = styled.main`
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-flow: wrap;
  align-content: flex-start;
  overflow-y: scroll;
`
