import { BiCheckCircle, BiXCircle } from 'react-icons/bi'
import { Container } from './style'
import PropTypes from 'prop-types'

const WhithinTolerance = ({ erros }) => {
  return (
    <Container>
      {/* {erros.length > 0 ? (
        <BiXCircle color="red" />
      ) : (
        <BiCheckCircle color="green" />
      )} */}
      {erros.length > 0 ? (
        <ul>
          {erros.map((item, i) => (
            <li key={i}>
              <BiXCircle color="red" />
              {item.error}
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          <li>
            <BiCheckCircle color="green" />
            Tudo Certo
          </li>
        </ul>
      )}
    </Container>
  )
}

WhithinTolerance.propTypes = {
  erros: PropTypes.array.isRequired,
}

export default WhithinTolerance
