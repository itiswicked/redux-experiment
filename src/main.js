import { createStore } from 'redux';
import expect from 'expect';

function counter(state, action) {
  return state;
}


expect(
  counter(0, {type: 'INCREMENT'})
).toEqual(1);

expect(
  counter(1, {type: 'INCREMENT'})
).toEqual(2);

expect(
  counter(2, {type: 'DECREMENT'})
).toEqual(2);
