import React, { useReducer } from 'react'

const initialState = {
    todos: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'addTodos':
            const newTodo = {
                id: Date.now(),
                text: action.payload.text
            }

            return {
                ...state,
                todos: [...state.todos, newTodo]
            }

        case 'removeTodos':
            return {
                ...state,
                todos: state.todos.filter(
                    (item) => item.id !== action.payload.id
                )
            }

        default:
            return state
    }
}

const Todos = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div>
            <button
                onClick={() =>
                    dispatch({
                        type: 'addTodos',
                        payload: { text: 'Learn React' }
                    })
                }
            >
                Add Todo
            </button>

            {state.todos.map((todo) => (
                <div key={todo.id}>
                    {todo.text}
                    <button
                        onClick={() =>
                            dispatch({
                                type: 'removeTodos',
                                payload: { id: todo.id }
                            })
                        }
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Todos
