import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import loadFromLocal from '../lib/loadFromLocal'
import saveToLocal from '../lib/saveToLocal'
import postUser from '../services/postUser'
import Board from './Board'
import Login from './Login'

function App() {
  const [user, setUser] = useState(loadFromLocal('user'))
  const [error, setError] = useState(null)

  useEffect(() => {
    saveToLocal('user', user)
  }, [user])

  return (
    error || (
      <Grid loggedOut={!user}>
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
