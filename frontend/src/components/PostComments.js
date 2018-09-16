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
        <h5 style={{ borderBottomColor: 'gray', borderBottomStyle: 'solid', borderBottomWidth: 2 }}>
          POST COMMENTS:
        </h5>
        {comments.map(item => (
          <Comment comment={item} key={item.id} />
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