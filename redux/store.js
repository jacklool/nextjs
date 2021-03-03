import { useMemo } from 'react'
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

let store

const initialState = {
    restaurants: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_RESTAURANTS':
            return {
                ...state,
                restaurants: action.payload
            }
        case 'ADD_RESTAURANT':
            return {
                ...state,
                restaurants: [action.payload, ...state.restaurants]
            }
        case 'DEL_RESTAURANT':
            return {
                ...state,
                restaurants: state.restaurants.filter(item => item.id !== action.payload)
            }
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