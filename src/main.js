import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';

const toggleTodo = (todo) => {
  return Object.assign({}, todo, {
    completed: !todo.completed
  })
}

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  };
  deepFreeze(todoBefore)

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter)
}

testToggleTodo();
console.log("Tests passed!");

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
