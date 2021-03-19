import { useState } from 'react'
import styled from 'styled-components/macro'
import useLocalStorage from '../hooks/useLocalStorage'
import useToggle from '../hooks/useToggle'
import postUser from '../services/postUser'
import Board from './Board'
import Login from './Login'

function App() {
  const [error, setError] = useState(null)
  const [user, setUser] = useLocalStorage('user')
  const [isActive, toggleActive] = useToggle(false)

  return (
    error || (
      <Grid loggedOut={!user}>
        <button onClick={toggleActive}>{isActive ? 'Ho' : 'Hey'}</button>
        {user ? (
          <Board user={user} onLogout={() => setUser(null)} />
        ) : (
          <Login onSubmit={createUser} />
        )}
      </Grid>
    )
  )

  function createUser(name) {
    postUser(name).then(setUser).catch(setError)
  }
}

const Grid = styled.div`
  display: grid;
  ${props => props.loggedOut && 'place-items: center'};
  height: 100vh;
`

export default App
