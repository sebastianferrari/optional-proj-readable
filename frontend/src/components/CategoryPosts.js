import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PostList from './PostList';

class CategoryPosts extends Component {
  state = {

  }

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
  const { cat } = props.category

  return {
    posts: posts.filter(o => {
      o.category === cat
    })
  }
}

export default connect(mapStateToProps)(CategoryPosts)