import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import getRandomName from '../services/getRandomName'
import Button from './Button'

export default function Login({ onLogin }) {
  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Identifier:
        <input name="identifier" placeholder="Username or email" />
      </label>
      <label>
        Password:
        <input name="password" type="password" placeholder="" />
      </label>
      <Button>Let's go!</Button>
    </Form>
  )

  function handleSubmit(event) {
    event.preventDefault()
    const { identifier, password } = event.target.elements
    onLogin({ identifier: identifier.value, password: password.value })
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
