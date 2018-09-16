import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleReceiveComments } from '../actions/comments';
import Comment from './Comment'

class PostComments extends Component {
  componentDidMount() {
    const { postId } = this.props
    // console.log('CDM====> ', postId)
    
    if (postId !== '') {
      this.props.getComments(postId)
    }
  }
  render() {
    const { postId, comments } = this.props
    //if (this.props.comments.length)

    return (
      <div>
        <h5>COMMENTS POST ID {postId}</h5>
        {comments.map(item => (
          <Comment postId={postId} key={item.id} />
        ))}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  console.log({dispatch})
  return {
    getComments: (postId) => dispatch(handleReceiveComments(postId))
  }
}

function mapStateToProps({ comments }, props) {
  const { postId } = props
  return {
    comments: comments.filter(o => o.parentId === postId),
    postId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostComments)

// author: "thingtwo"
// body: "Hi there! I am a COMMENT."
// deleted: false
// id: "894tuq4ut84ut8v4t8wun89g"
// parentDeleted: false
// parentId: "8xf0y6ziyjabvozdd253nd"
// timestamp: 1468166872634
// voteScore: 6
