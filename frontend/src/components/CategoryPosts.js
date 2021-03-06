import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PostList from './PostList';

class CategoryPosts extends Component {
  render() {
    const { category } = this.props

    return (
      <Fragment>
        <h2>CATEGORY: <span style={{ textTransform: 'uppercase' }}>{category}</span></h2>
        <PostList category={category} />
      </Fragment>
    )
  }
}

function mapStateToProps({ posts }, props) {
  const { category } = props.match.params

  return {
    category
  }
}

export default connect(mapStateToProps)(CategoryPosts)