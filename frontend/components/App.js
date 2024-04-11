import React, {useReducer} from 'react'
import Todos from './Todos'
import TodoForm from './TodoForm'

const actions = {
  CREATE_NEW_TODO: 'CREATE_NEW_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  TOGGLE_LIST: 'TOGGLE_LIST'
}

let id = 1
const getNextId = () => id++

const reducer = (state, action) => {
  switch(action.type) {
    case actions.CREATE_NEW_TODO: 
      return (
        {...state, todos: [...state.todos, action.payload]}
      )
    case actions.TOGGLE_TODO:
      return (
        {
          ...state, 
          todos: state.todos.map(td => {
            if (td.id !== action.payload) return td
            return {...td, complete: !td.complete}
          })
        }
      )
    case actions.TOGGLE_LIST:
      return ({...state, todos: [...state.todos], showList: !state.showList})
    default:
      return state
  }
}

const initialState = {
  todos: [
    { id: getNextId(), label: 'Laundry', complete: true },
    { id: getNextId(), label: 'Groceries', complete: false },
    { id: getNextId(), label: 'Dishes', complete: false }
  ],
  showList: true
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const createNewTodo = (label, complete) => {
    const newTodo = {id: getNextId(), label, complete}
    dispatch({type: actions.CREATE_NEW_TODO, payload: newTodo})
  }
  const toggleTodo = id => {
    dispatch({type: actions.TOGGLE_TODO, payload: id})
  }
  const toggleList = () => {
    dispatch({type: actions.TOGGLE_LIST})
  }

  return (
    <div id="mp">
      <h2>Guided Project</h2>
      <Todos
        todos={state.todos}
        toggleTodo={toggleTodo}
        toggleList={toggleList}
        showList={state.showList}
      />
      <TodoForm
        createNewTodo={createNewTodo}
      />
    </div>
  )
}
