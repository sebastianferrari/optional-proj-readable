import {
  RECEIVE_COMMENTS
} from '../actions/actionTypes'

export default function comments(state = [], action) {
  // console.log('STATE FROM REDUCER ', state)
  // console.log('ACTION FROM REDUCER ', action)
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return [
        //...state, This is temporal because in a real scenario 
          // I need to replace just only existing items that
          // were been modified. 
        ...action.comments
      ]   
  
    default:
      return state
  }
}