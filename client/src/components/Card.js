import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Icon from 'supercons'

Card.propTypes = {
  authorColor: PropTypes.string,
  text: PropTypes.string,
  name: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired,
  votes: PropTypes.number,
}

export default function Card({
  authorColor = 'hotpink',
  text = <em>No comment</em>,
  name = 'Anonymous',
  votes = 0,
  onDelete,
  onVote,
}) {
  const voteThreshold = votes > 99 ? '99+' : votes

  return (
    <CardStyled>
      <Name authorColor={authorColor}>{name}</Name>
      {text}
      <IconWrapper>
        <Icon
          onClick={() => onDelete?.()}
          role="button"
          glyph="delete"
          size={24}
        />
        <VoteCircle onClick={onVote}>{votes ? voteThreshold : '+'}</VoteCircle>
      </IconWrapper>
    </CardStyled>
  )
}

const CardStyled = styled.li`
  display: grid;
  align-content: space-between;
  border-radius: 4px;
  padding: 20px 20px 10px 20px;
  background: linear-gradient(#eee, #efefef);
`

const Name = styled.div`
  text-transform: uppercase;
  font-size: 0.8em;
  color: ${props => props.authorColor};
`

const IconWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  svg:hover {
    fill: crimson;
  }
`

const VoteCircle = styled.button.attrs(props => ({ 'aria-label': 'vote' }))`
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
`
