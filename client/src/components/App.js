import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import loadFromLocal from '../lib/loadFromLocal'
import saveToLocal from '../lib/saveToLocal'
import postUser from '../services/postUser'
import Board from './Board'
import Button from './Button'
import Register from './Register'
import Login from './Login'
import loginUser from '../services/loginUser'

function App() {
  const [user, setUser] = useState(loadFromLocal('user'))
  const [error, setError] = useState(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const errorMessages = JSON.stringify(error?.message, null, 2)

  useEffect(() => {
    saveToLocal('user', user)
  }, [user])

  return (
    <Grid loggedOut={!user}>
      <Error onClick={() => setError(null)} isVisible={error}>
        <pre>{errorMessages}</pre>
      </Error>
      {user ? (
        <Board user={user} onLogout={() => setUser(null)} onError={setError} />
      ) : (
        <>
          {isRegistered ? (
            <Login onLogin={handleLoginUser} />
          ) : (
            <Register onRegister={createUser} />
          )}
          <LogInButton
            type="button"
            onClick={() => setIsRegistered(!isRegistered)}
            css="font-size: smaller"
          >
            {isRegistered
              ? "You don't have a user? Register here!"
              : 'Allready isRegistered? Click here to log in!'}
          </LogInButton>
        </>
      )}
    </Grid>
  )

  function handleLoginUser(user) {
    const authenticationObject = {
      identifier: user.email,
      password: user.password,
    }

    loginUser(authenticationObject)
      .then(data =>
        setUser({
          username: data.user.username,
          token: data.jwt,
          id: data.user.id,
        })
      )
      .catch(setError)
  }

  function createUser(user) {
    postUser(user)
      .then(data =>
        setUser({
          username: data.user.username,
          token: data.jwt,
          id: data.user.id,
        })
      )
      .catch(setError)
  }
}

const Error = styled.aside`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 8px;
  box-shadow: 0 4px 6px #0006;
  color: tomato;
  background: white;
`

const Grid = styled.div`
  display: grid;
  ${props => props.loggedOut && 'place-items: center'};
  height: 100vh;
`

const LogInButton = styled(Button)`
  background: white;
  color: plum;
  border: 1px dashed plum;
  max-width: 360px;

  &:hover {
    background: plum;
    color: white;
    border: none;
  }
`

export default App
