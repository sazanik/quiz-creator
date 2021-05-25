import React from "react";
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

class Auth extends React.Component {
  loginHandler = () => {

  }

  registerHandler = () => {

  }

  submitHandler = e => {
    e.preventDefault()
  }


  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Login</h1>

          <form onSubmit={this.submitHandler}>
            <Input label='Email'/>
            <Input
              label='Password'
              errorMessage='TEST'
            />
            <Button
              onClick={this.loginHandler}
              type='success'
            >
              Sign in
            </Button>

            <Button
              onClick={this.registerHandler}
              type='primary'
            >
              Registration
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

export default Auth