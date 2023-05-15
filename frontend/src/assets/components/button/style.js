import styled from 'styled-components'

const messageColors = {
  default: '#5636D3',
  error: '#e83f5b',
  success: '#12a454',
}

export const LinkButton = styled.button`
  background-color: ${({ type }) => messageColors[type || 'default']};

  color: white;
  margin: 20px;

  a {
    color: white;
  }
`
