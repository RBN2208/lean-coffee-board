import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import getRandomName from '../services/getRandomName'
import Button from './Button'

export default function Login({ onSubmit }) {
  const [randomName, setRandomName] = useState('')

  useEffect(() => {
    getRandomName()
      .then(setRandomName)
      .catch(() => {})
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Choose a name:
        <input name="name" placeholder={randomName} />
      </label>

      <Button>Let's go!</Button>
    </Form>
  )

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(event.target.elements.name.value || randomName)
  }
}

const Form = styled.form`
  display: grid;
  gap: 20px;
  padding: 40px;
  border-radius: 12px;
  border: 2px dashed plum;
  box-shadow: 0 4px 8px #0003;
  max-width: 360px;
  width: 100%;

  label {
    display: grid;
    gap: 10px;
  }

  input {
    width: 100%;
  }
`
