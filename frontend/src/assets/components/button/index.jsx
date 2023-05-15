import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { LinkButton } from './style'

const Button = ({ text, to }) => {
  return (
    <Link to={to}>
      <LinkButton>{text}</LinkButton>
    </Link>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default Button
