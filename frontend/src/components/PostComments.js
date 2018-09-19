import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleReceiveComments } from '../actions/comments';
import Comment from './Comment'

class PostComments extends Component {
  componentDidMount() {
    const { postId } = this.props
    
    if (postId !== '') {
      this.props.getComments(postId)
    }
  }

  render() {
    const { comments } = this.props

    return (
      <div>
        <h5 style={{ 
          borderBottomColor: 'gray', 
          borderBottomStyle: 'solid', 
          borderBottomWidth: 2,
          marginBottom: 0,
          paddingBottom: 5
          }}
        >
          COMMENTS:
        </h5>
        {comments.map(item => (
          <Comment comment={item} key={item.id} />
        ))}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getComments: (postId) => dispatch(handleReceiveComments(postId))
  }
}

function mapStateToProps({ comments }, props) {
  const { postId } = props
  return {
    comments: comments.filter(o => o.parentId === postId && o.deleted === false)
      .sort((a, b) => b.timestamp - a.timestamp),
    postId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostComments)