import React from "react";
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button"
import Input from "../../components/UI/Input/Input";
import {createControl} from "../../form/formFramework";

function createOptionControl(number) {
  return createControl({
    label: 'Option ' + number,
    errorMessage: 'The field cannot be empty',
    id: number
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Enter a question',
      errorMessage: 'The field cannot be empty',
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

class QuizCreator extends React.Component {

  state = {
    quiz: [],
    formControls: createFormControls()
  }

  submitHandler = e => e.preventDefault()
  addQuestionHandler = () => {
  }

  createQuizHandler = () => {

  }

  /*onchangeHandler = (value, controlName) => {

  }*/

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]

      return (
        <React.Fragment key={controlName+index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={e => this.changeHandler(e.target.value, controlName)}
          />
          {index === 0 ? <hr/> : null}
        </React.Fragment>
      )

    })
  }

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Quiz Creator</h1>

          <form onSubmit={this.submitHandler}>

            {this.renderControls()}

            <select>

            </select>

            <Button type='primary' onClick={this.addQuestionHandler}>Add question</Button>
            <Button type='success' onClick={this.createQuizHandler}>Create test</Button>
          </form>

        </div>
      </div>
    )
  }
}

export default QuizCreator