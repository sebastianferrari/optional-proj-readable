import {
  RECEIVE_POSTS, 
  DELETE_POST
} from '../actions/actionTypes'

export default function posts(state = [], action) {
  //console.log('FROM REDUCER ', action.posts)
  switch (action.type) {
    case RECEIVE_POSTS:
      return [
        ...state,
        ...action.posts
      ]
    
    case DELETE_POST:
      return [
        ...state.filter(o => o.id !== action.postId)
      ]
  
    default:
      return state
  }
}