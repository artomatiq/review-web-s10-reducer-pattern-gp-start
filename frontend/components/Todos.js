import React from 'react'
import styled from 'styled-components'

const StyledTodo = styled.li`
  text-decoration: ${pr => pr.$complete ? 'line-through' : 'initial'};
  cursor: pointer;
`

export default function Todo({
  todos, toggleTodo, toggleList, showList
}) {
  return (
    <div id="todos">
      <h3>Todos</h3>
      {showList && <ul>
        {
          todos
            .map(todo => (
              <StyledTodo $complete={todo.complete} key={todo.id} onClick={() => toggleTodo(todo.id)}>
                <span>{todo.label}{todo.complete && ' ✔️'}</span>
              </StyledTodo>
            ))
        }
      </ul>}
      <button onClick={toggleList}>
        {showList? 'Hide' : 'Show'} completed todos
      </button>
    </div>
  )
}
