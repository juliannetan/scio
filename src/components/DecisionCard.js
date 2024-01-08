// src/components/DecisionCard.js
import styled from 'styled-components'

const DecisionCardContainer = styled.div`
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.secondary};
  padding: 20px;
  margin: 10px;
`

const DecisionCard = ({ decision }) => {
  return <DecisionCardContainer>{decision}</DecisionCardContainer>
}

export default DecisionCard
