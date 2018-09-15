import { showLoading, hideLoading } from "react-redux-loading"
import { getInitialData } from '../utils/api'
import { receivePosts } from './posts'
import { receiveCategories } from './categories'

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ posts, categories }) => {
        console.log({ posts })
        console.log({categories})
        dispatch(receivePosts(posts))
        dispatch(receiveCategories(categories))
        dispatch(hideLoading())
      })
  }
}