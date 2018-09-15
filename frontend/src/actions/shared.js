import { showLoading, hideLoading } from "react-redux-loading"
import { getAllPosts } from '../utils/api'
import { receivePosts } from './posts'

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getAllPosts()
      .then(posts => {
        console.log({posts})
        dispatch(receivePosts(posts))
        dispatch(hideLoading())
      })
  }
}