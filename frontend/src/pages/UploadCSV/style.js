import styled from 'styled-components'

export const Container = styled.div`
  color: #000000;

  form {
    display: inline-flex;
    gap: 100px;
    margin: 20px;
  }
`

const messageColors = {
  default: '#5636D3',
  true: '#e83f5b',
  false: '#12a454',
}

export const SubmitButton = styled.button.attrs({ type: 'submit' })`
  background-color: ${({ havefalse }) => messageColors[havefalse]};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : null)};

  color: white;
  margin: 20px;

  a {
    color: white;
  }
`
