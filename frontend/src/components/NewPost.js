import React, { Component } from 'react'
import { connect } from 'react-redux'

class NewPost extends Component {
  state = {
    editing: false
  }

  render() {
    const { post } = this.props
    console.log({ post })
    if (post) {
      return (
        <h2>EDITING POST</h2>
      )
    } else {
      return (
        <h2>NEW POST</h2>
      )
    }
  }
}

function mapStateToProps({ posts }, props) {
  const { postId } = props.match.params
  // console.log({postId})
  return {
    post: posts.filter(o => o.id === postId)[0]
  }
}

export default connect(mapStateToProps)(NewPost)