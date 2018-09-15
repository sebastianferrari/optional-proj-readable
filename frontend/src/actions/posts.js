//import { showLoading, hideLoading } from 'react-redux-loading'
import {
  RECEIVE_POSTS
} from './actionTypes'

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}