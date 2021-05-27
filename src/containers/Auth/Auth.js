import React from "react";
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'
import axios from "axios";


/*function validateEmail(email) {
  const regexp = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regexp.test(String(email).toLowerCase())
}*/

class Auth extends React.Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Enter correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Enter correct password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        }
      },
    }
  }

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    }

    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0P9HAXHXtbe7cyUeeMNKyk-JNUrukId8', authData)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    }

    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0P9HAXHXtbe7cyUeeMNKyk-JNUrukId8', authData)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  submitHandler = e => {
    e.preventDefault()
  }

  validateControl(value, validation) {
    if (!validation) return true

    let isValid = true

    if (validation.required) isValid = value.trim() !== '' && isValid


    if (validation.email) isValid = is.email(value) && isValid


    if (validation.minLength) isValid = value.length >= validation.minLength && isValid

    return isValid
  }

  onChangeHandler = (e, controlName) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}
    let isFormValid = true


    control.value = e.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    Object.keys(formControls).forEach((name => {
      isFormValid = formControls[name].valid && isFormValid
    }))

    this.setState({formControls, isFormValid})
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={e => this.onChangeHandler(e, controlName)}
        />
      )
    })
  }


  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Login</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderInputs()}
            <Button onClick={this.loginHandler} type='success' disabled={!this.state.isFormValid}>Sign in</Button>
            <Button onClick={this.registerHandler} type='primary' disabled={!this.state.isFormValid}>Registration</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default Auth