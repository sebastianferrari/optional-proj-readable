import {
  RECEIVE_CATEGORIES
} from '../actions/actionTypes'

export default function categories(state = [], action) {
  console.log('FROM REDUCER ', action.categories)
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return [
        ...state,
        ...action.categories
      ]   
  
    default:
      return state
  }
}