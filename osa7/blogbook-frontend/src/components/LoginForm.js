import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  const style = {
    margin: "10px 0px 0px 5px"
  }
  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>username:</Form.Label>
          <Form.Control
            id='username'
            value={username}
            onChange={handleUsernameChange}
            />
         <Form.Label>password :</Form.Label>
          <Form.Control
            id='password'
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
          <Button style={style} variant="primary" id="login-button" type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm