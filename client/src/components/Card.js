import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Icon from 'supercons'

Card.propTypes = {
  author: PropTypes.string,
  authorColor: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired,
  text: PropTypes.string,
  votes: PropTypes.number,
}

export default function Card({
  author = 'Anonymous',
  authorColor = 'hotpink',
  onDelete,
  onVote,
  text = <em>No comment</em>,
  votes = 0,
}) {
  const voteThreshold = votes > 99 ? '99+' : votes

  return (
    <CardStyled>
      <Author color={authorColor}>{author}</Author>
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

const Author = styled.div`
  text-transform: uppercase;
  font-size: 0.8em;
  color: ${props => props.color};
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
