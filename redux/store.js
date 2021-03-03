import { useMemo } from 'react'
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

let store
const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE0Njc5MDU3LCJleHAiOjE2MTcyNzEwNTd9.hU0WiM9rkIn5PB8Fx08-J3VpjrEDsQ3jhMScDshYeZ8';

const initialState = {
  restaurents: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RESTAURENT_LIST':
      axios.get('http://localhost:1337/restaurants', {
            headers: {
              Authorization: `Bearer ${access_token}`
            }
          })
          .then((res) => {
              console.log("redux GET_RESTAURENT_LIST")
              console.log(res.data);
              return state
          })
          .catch(err => {
            console.log('Error: ' + err);
            return state
          });
          break;
    case 'ADD_RESTAURENT':
      console.log('ADD_RESTAURENT');
      axios.post('http://localhost:1337/restaurants', action.playload,{
        headers: {
              Authorization: `Bearer ${access_token}`
            }
          })
          .then((res) => {
              return {
                  ...state,
                  restaurents: [res.data, ...state.restaurents]
              }
          })
          .catch(err => {
            console.log('Error: ' + err);
            return state
          });
          break;
    case 'DECREMENT':
      return {
        ...state,
      }
    case 'RESET':
      return {
        ...state,
        count: initialState.count,
      }
      break;
    default:
      return state
  }
}

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}