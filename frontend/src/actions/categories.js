//import { showLoading, hideLoading } from 'react-redux-loading'
import {
  RECEIVE_CATEGORIES
} from './actionTypes'

export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}