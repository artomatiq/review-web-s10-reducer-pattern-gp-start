import React, {useReducer} from 'react'

const CHANGE_NAME = 'CHANGE_NAME'
const CHANGE_COMPLETED = 'CHANGE_COMPLETED'
const RESET_FORM = 'RESET_FORM'

const initialState = {
  name: '',
  completed: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_NAME:
      return ({...state, name: action.payload})
    case CHANGE_COMPLETED:
      return ({...state, completed: action.payload})
    case RESET_FORM:
      return {...initialState}
    default: 
      return state
  }
}



export default function TodoForm(props) {

  const [state, dispatch] = useReducer(reducer, initialState)

  const onNameChange = (evt) => {
    dispatch({type: CHANGE_NAME, payload: evt.target.value})
  }
  const onCompletedChange = (evt) => {
    dispatch({type: CHANGE_COMPLETED, payload: evt.target.checked})
  }
  const resetForm = () => {
    dispatch({type: RESET_FORM, payload: ''})
  }
  const onSubmit = (e) => {
    e.preventDefault()
    props.createNewTodo(state.name, state.completed)
    resetForm()
  }

  return (
    <form id="todoForm">
      <h3>New Todo Form</h3>
      <label><span>Todo label:</span>
        <input
          type='text'
          name='todoLabel'
          value={state.name}
          onChange={onNameChange}
          placeholder='Type label'
        />
      </label>
      <label><span>Is completed:</span>
        <input
          type='checkbox'
          name='todoIsCompleted'
          checked={state.completed}
          onChange={onCompletedChange}
        />
      </label>
      <label><span>Create todo:</span>
        <input
          type='submit'
          value='Do it!'
          onClick={onSubmit}
        />
      </label>
    </form>
  )
}
