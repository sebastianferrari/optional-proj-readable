import {
  RECEIVE_COMMENTS
} from '../actions/actionTypes'

export default function comments(state = [], action) {
  // console.log('STATE FROM REDUCER ', state)
  // console.log('ACTION FROM REDUCER ', action)
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return [
        //...state,
        ...action.comments
      ]   
  
    default:
      return state
  }
}