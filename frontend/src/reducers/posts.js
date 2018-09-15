import {
  RECEIVE_POSTS
} from '../actions/actionTypes'

export default function posts(state = [], action) {
  console.log('FROM ACTIONS ', action.posts)
  switch (action.type) {
    case RECEIVE_POSTS:
      return [
        ...state,
        ...action.posts
      ]   
  
    default:
      return state
  }
}