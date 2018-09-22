import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleReceiveComments, handleAddComment } from '../actions/comments'
import Comment from './Comment'
import { Glyphicon, Button, Modal, FormGroup, FormControl, ControlLabel, Row, Col, Badge } from 'react-bootstrap'
import { getNewId, getTimestamp } from '../utils/helpers'

class PostComments extends Component {
  state = {
    showAddCommentModal: false,
    comment: {
      body: '',
      author: ''
    }
  }

  componentDidMount() {
    const { postId } = this.props

    if (postId !== '') {
      this.props.getComments(postId)
    }
  }

  handleAddComment = () => {
    this.handleOpen()

    const { postId } = this.props
    const { comment } = this.state

    // Populate the rest of the required properties
    comment.id = getNewId()
    comment.timestamp = getTimestamp()
    comment.parentId = postId

    this.props.addComment(comment)

    this.handleClose()
  }

  handleClose = () => {
    this.setState({
      showAddCommentModal: false
    })
  }

  handleOpen = () => {
    this.setState({
      showAddCommentModal: true
    })
  }

  handleOnBodyChange = (e) => {
    let body = e.target.value

    this.setState(prevState => ({
      comment: {
        ...prevState.comment,
        body
      }
    }))
  }

  handleOnAuthorChange = (e) => {
    let author = e.target.value

    this.setState(prevState => ({
      comment: {
        ...prevState.comment,
        author
      }
    }))
  }

  render() {
    const { comments } = this.props
    const { comment } = this.state

    return (
      <div style={{ marginTop: 10 }}>
        <Row style={{ borderBottomColor: 'gray', borderBottomStyle: 'solid',
          borderBottomWidth: 2, marginBottom: 0, paddingBottom: 5 }}
        >
          <Col xs={8}>
            <Badge style={{ backgroundColor: 'lightblue', color: 'black' }}>
              {comments.length}
            </Badge> comments
          </Col>
          <Col xs={4} className='text-right'>
            <Button bsStyle="success" onClick={this.handleOpen}>
              <Glyphicon glyph='plus' />
            </Button>
          </Col>
        </Row>

        {comments.map(item => (
          <Comment comment={item} key={item.id} />
        ))}

        <Modal show={this.state.showAddCommentModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Body</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Enter a body"
              value={comment.body}
              onChange={this.handleOnBodyChange} />
          </FormGroup>

          <FormGroup controlId="formControlsInput">
            <ControlLabel>Author</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter an author"
              value={comment.author}
              onChange={this.handleOnAuthorChange} />
          </FormGroup>
 
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleAddComment}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getComments: (postId) => dispatch(handleReceiveComments(postId)),
    addComment: (comment) => dispatch(handleAddComment(comment))
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