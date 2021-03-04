import styled from 'styled-components'

export default function LeanCards({ text, author }) {
  return (
    <>
      <Textbox>
        {text}
        {author.name}
      </Textbox>
    </>
  )
}

const Textbox = styled.div`
  padding: 20px;
  background-color: cornflowerblue;
`
