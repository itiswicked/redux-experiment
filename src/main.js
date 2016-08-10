import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';

const todo = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_COMPLETED':
      if(state.id !== action.id) return state;
      return Object.assign({}, state, {completed: !state.completed});
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_COMPLETED':
      return state.map(t => todo(t, action))
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

const FilterLink = ({filter, currentFilter, children}) => {
  let clickHandler = (e) => {
    e.preventDefault();
    store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter
    });
  };
  let style = filter == currentFilter ? 'underline' : 'none'
  return (
    <a href="#" onClick={clickHandler} style={{textDecoration: style}}>
      {children}
    </a>
  );
}

let nextTodoId = 0;
class TodoApp extends React.Component {

  render() {
    const {todos, visibilityFilter } = this.props;
    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter
    );

    const dispatchClickAction = () => {
      store.dispatch({
        type: 'ADD_TODO',
        text: this.input.value,
        id: nextTodoId++
      })
      this.input.value = '';
    };

    let todoComps = visibleTodos.map(todo => {
      let style = todo.completed ? "line-through" : "none"
      return(
        <li key={todo.id} onClick={() => {
          store.dispatch({
            type: 'TOGGLE_COMPLETED',
            id: todo.id
          });
        }}>
          <p style={{textDecoration: style}}>{todo.text}</p>
        </li>
      )
    });

    return (
      <div>
        <input ref={node => {
          this.input = node;
        }} />
        <button onClick={dispatchClickAction}>
          Add Todo
        </button>
        <ul>
          {todoComps}
        </ul>
        <p>
          <FilterLink filter="SHOW_ALL" currentFilter={visibilityFilter}>
           All
          </FilterLink>
          {' '}
          <FilterLink filter="SHOW_ACTIVE" currentFilter={visibilityFilter}>
            Active
          </FilterLink>
          {' '}
          <FilterLink filter="SHOW_COMPLETED" currentFilter={visibilityFilter}>
            Completed
          </FilterLink>
        </p>
      </div>
    );
  }
}

const todoApp = combineReducers({ todos, visibilityFilter });
const store = createStore(todoApp);

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()}/>,
    document.getElementById('app')
  )
}

store.subscribe(render);
render();

// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(
//       state.todos,
//       action
//     ),
//     visibilityFilter: visibilityFilter(
//       state.visibilityFilter,
//       action
//     )
//   };
// }


// const combineReducers = (reducers) => {
//   return (state = {}, action) => {
//     return Object.keys(reducers).reduce((nextState, key) => {
//         nextState[key] = reducers[key](
//           state[key],
//           action
//         );
//         return nextState;
//       },
//       {}
//     );
//   }
// }

// console.log('Initial State:');
// console.log(store.getState());
// console.log("--------------");
//
// console.log('Dispatching ADD_TODO');
// store.dispatch({
//   type: 'ADD_TODO',
//   id: 0,
//   text: 'Go shopping'
// });
//
// console.log('Updated State');
// console.log(store.getState());
// console.log("--------------");
//
// console.log('Dispatching ADD_TODO');
// store.dispatch({
//   type: 'ADD_TODO',
//   id: 1,
//   text: 'Learn Redux'
// });
//
// console.log('Updated State');
// console.log(store.getState());
// console.log("--------------");
//
// console.log('Dispatching TOGGLE_TODO');
// store.dispatch({
//   type: 'TOGGLE_COMPLETED',
//   id: 0
// });
//
// console.log('Updated State');
// console.log(store.getState());
// console.log("--------------");
//
// console.log('Dispatching SET_VISIBILITY_FILTER');
// store.dispatch({
//   type: 'SET_VISIBILITY_FILTER',
//   filter: 'SHOW_COMPLETED'
// })
//
// console.log('Updated filtered state:');
// console.log(store.getState());
// console.log("--------------");

// const testAddTodo = () => {
//   const stateBefore = [];
//   const action = {
//     type: 'ADD_TODO',
//     id: 0,
//     text: 'Learn Redux'
//   };
//   const stateAfter = [
//     {
//       id: 0,
//       text: 'Learn Redux',
//       completed: false
//     }
//   ];
//   deepFreeze(stateBefore)
//   deepFreeze(action)
//
//   expect(
//     todos(stateBefore, action)
//   ).toEqual(stateAfter)
// };
//
// const testToggleTodo = () => {
//   const stateBefore = [
//     {
//       id: 0,
//       text: 'Learn Redux',
//       completed: false
//     },
//     {
//       id: 1,
//       text: 'Go Shopping',
//       completed: false
//     }
//   ];
//   const stateAfter = [
//    {
//       id: 0,
//       text: 'Learn Redux',
//       completed: true
//     },
//     {
//       id: 1,
//       text: 'Go Shopping',
//       completed: false
//     }
//   ]
//   const action = { type: 'TOGGLE_COMPLETED', id: 0 }
//   deepFreeze(stateBefore)
//   deepFreeze(action)
//
//   expect(
//     todos(stateBefore, action)
//   ).toEqual(stateAfter)
// }
//
// testAddTodo();
// testToggleTodo();

// console.log("TESTS PASSED AWWW YISS");

////////////////////////////////

// const toggleTodo = (todo) => {
//   return Object.assign({}, todo, {
//     completed: !todo.completed
//   })
// }
//
// const testToggleTodo = () => {
//   const todoBefore = {
//     id: 0,
//     text: 'Learn Redux',
//     completed: false
//   };
//   const todoAfter = {
//     id: 0,
//     text: 'Learn Redux',
//     completed: true
//   };
//   deepFreeze(todoBefore)
//
//   expect(
//     toggleTodo(todoBefore)
//   ).toEqual(todoAfter)
// }
//
// testToggleTodo();
// console.log("Tests passed!");

/////////////////////////////////

// const addCounter = (list) => {
//   return [...list, 0];
// };
//
// const removeCounter = (list, index) => {
//   return [
//     ...list.slice(0, index),
//     ...list.slice(index + 1)
//   ];
// };
//
// const incrementCounter = (list, index) => {
//   return [
//     ...list.slice(0, index),
//     list[index] + 1,
//     ...list.slice(index + 1)
//   ]
// };
//
// const testAddCounter = () => {
//   const listBefore = [];
//   const listAfter = [0];
//   deepFreeze(listBefore);
//
//   expect(
//     addCounter(listBefore)
//   ).toEqual(listAfter)
// };
//
// const testRemoveCounter = () => {
//   const listBefore = [0, 10, 20];
//   const listAfter = [0, 20];
//   deepFreeze(listBefore);
//
//   expect(
//     removeCounter(listBefore, 1)
//   ).toEqual(listAfter);
// };
//
// const testIncrementCounter = () => {
//   const listBefore = [0, 10, 20];
//   const listAfter = [0, 11, 20];
//   deepFreeze(listBefore);
//
//   expect(
//     incrementCounter(listBefore, 1)
//   ).toEqual(listAfter)
// };
//
// testAddCounter();
// testRemoveCounter();
// testIncrementCounter();
// console.log("All tests passing!");

////////////////////////////

// const counter = (state = 0, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1;
//     case 'DECREMENT':
//       return state - 1;
//     default:
//       return state;
//   }
// }
//
// const store = createStore(counter);
//
// const Counter = ({value, onIncrement, onDecrement}) => {
//   return (
//     <div>
//       <h1>{value}</h1>
//       <button onClick={onIncrement}>INCREMENT</button>
//       <br />
//       <button onClick={onDecrement}>DECREMENT</button>
//     </div>
//   );
// }
//
// const render = () => {
//   ReactDOM.render(
//     <Counter
//       value={store.getState()}
//       onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
//       onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
//     />,
//     document.getElementById('app')
//   )
// };
//
// store.subscribe(render);
// render();

// ###

// const createStore = (reducer) => {
//   let state;
//   let listeners = [];
//
//   const getState = () => state;
//
//   const dispatch = (action) => {
//     state = reducer(state, action);
//     listeners.forEach(listener => listener());
//   };
//
//   const subscribe = (listener) => {
//     listeners.push(listener);
//     return () => {
//       listeners = listers.filter(l => l !== listener);
//     };
//   };
//
//   dispatch({});
//
//   return { getState, dispatch, subscribe };
// };
// console.log(store.getState());
//
// store.dispatch({ type: 'INCREMENT' });
// console.log(store.getState());

// document.addEventListener('click', () => {
//  store.dispatch({ type: 'INCREMENT' });
// });

// ###

// expect(
//   counter(0, {type: 'INCREMENT'})
// ).toEqual(1);
//
// expect(
//   counter(1, {type: 'INCREMENT'})
// ).toEqual(2);
//
// expect(
//   counter(2, {type: 'DECREMENT'})
// ).toEqual(1);
//
// expect(
//   counter(1, {type: 'DECREMENT'})
// ).toEqual(0);
//
// expect(
//   counter(2, {type: 'SOMETHING_ELSE'})
// ).toEqual(2);
//
// expect(
//   counter(undefined, {})
// ).toEqual(0);

// console.log("Tests Passed!");
