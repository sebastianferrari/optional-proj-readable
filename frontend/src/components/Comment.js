import React, { Component } from 'react'
import { 
  Media, 
  Row, 
  Col, 
  Button, 
  Glyphicon, 
  ButtonToolbar, 
  Modal, 
  FormGroup, 
  FormControl, 
  ControlLabel 
} from 'react-bootstrap'
import './Comment.css'
import { getDateFromTimestamp, getTimestamp } from '../utils/helpers'
import { 
  handleDeleteComment as handleDeleteCommentAction,
  handleEditComment as handleEditCommentAction
} from '../actions/comments'
import { confirmAlert } from 'react-confirm-alert'
import { connect } from 'react-redux'

class Comment extends Component {
  state = {
    comment: {},
    showModal: false
  }

  componentDidMount() {
    const { comment } = this.props

    if (comment && comment.id !== '') {
      this.setState({
        comment
      })
    }
  }

  handleDeleteComment = () => {
    const { comment, deleteComment } = this.props

    confirmAlert({
      title: 'Deleting Comment...',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteComment(comment.id)
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    })
  }

  handleEditComment = () => {
    this.handleOpen()
  }

  handleClose = () => {
    this.setState({
      showModal: false
    })
  }

  handleOpen = () => {
    this.setState({
      showModal: true
    })
  }

  handleSaveComment = () => {
    const { comment } = this.state
    const { editComment } = this.props

    comment.timestamp = getTimestamp()

    editComment(comment)

    this.handleClose()
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

  render() {
    const { comment } = this.props

    return (
      <div
        className='comment-item'
        style={{
          backgroundColor: comment.voteScore < 0
            ? 'rgba(255,0,0,.05)'
            : 'rgba(0,255,0,.05)'
        }}
      >
        <Row>
          <Col xs={9} sm={10}>
            <Media>
              <Media.Left>
                <div
                  className='comment-votescore'
                  style={{ color: comment.voteScore < 0 ? 'red' : 'green' }}
                >{comment.voteScore}</div>
              </Media.Left>
              <Media.Body>
                <Media.Heading>{comment.author} <span style={{ fontSize: 'small' }}>said:</span></Media.Heading>
                <p>{comment.body}</p>
              </Media.Body>
            </Media>
          </Col>
          <Col xs={3} sm={2} className='comment-date'>

            {getDateFromTimestamp(comment.timestamp)}

            <br />

            <ButtonToolbar>
              <Button bsSize='xsmall' bsStyle='primary' onClick={this.handleEditComment}>
                <Glyphicon glyph='edit' title='Edit Comment' />
              </Button>
              <Button bsSize='xsmall' bsStyle='danger' onClick={this.handleDeleteComment}>
                <Glyphicon glyph='trash' title='Delete Comment' />
              </Button>
            </ButtonToolbar>

          </Col>
        </Row>

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Body</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Enter a body"
                value={this.state.comment.body}
                onChange={this.handleOnBodyChange} />
            </FormGroup>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSaveComment}>Save</Button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteComment: (commentId) => dispatch(handleDeleteCommentAction(commentId)),
    editComment: (comment) => dispatch(handleEditCommentAction(comment))
  }
}

export default connect(null, mapDispatchToProps)(Comment)