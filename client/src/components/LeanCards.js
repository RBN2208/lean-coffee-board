import styled from 'styled-components/macro'

export default function LeanCards({ text, author }) {
  return (
    <>
      <CardBox>
        {text}
        <AuthorBox>{author.name}</AuthorBox>
      </CardBox>
    </>
  )
}

const CardBox = styled.div`
  width: 200px;
  height: 120px;
  padding: 10px;
  background-color: ghostwhite;
  position: relative;
  filter: drop-shadow(0 0 10px gray);
  font-family: Arial, Helvetica, sans-serif;
`

const AuthorBox = styled.div`
  background-color: grey;
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 210px;
  color: white;
  padding: 5px;
  text-align: right;
  font-family: Arial, Helvetica, sans-serif;
`
