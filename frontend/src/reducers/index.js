import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import posts from './posts'

export default combineReducers({
  posts,
  loadingBar: loadingBarReducer
})