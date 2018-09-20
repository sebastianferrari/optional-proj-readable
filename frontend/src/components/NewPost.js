import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap'
import { handleEditPost, handleAddPost } from '../actions/posts'
import { Redirect } from 'react-router-dom'
import { getNewId, getTimestamp } from '../utils/helpers'

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

class NewPost extends Component {
  state = {
    post: {
      id: '',
      title: '',
      body: '',
      author: '',
      category: ''
    },
    redirectToPost: false,
    redirectToHome: false
  }

  componentDidMount() {
    const post = this.props.post

    if (post && post.id !== '') {
      this.setState({
        post
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { post } = nextProps

    if (this.props.post !== post) {
      this.setState({
        post
      })
    }
  }

  handleOnTitleChange = (e) => {
    let title = e.target.value

    this.setState(prevState => ({
      post: {
        ...prevState.post,
        title
      }
    }))
  }

  handleOnBodyChange = (e) => {
    let body = e.target.value

    this.setState(prevState => ({
      post: {
        ...prevState.post,
        body
      }
    }))
  }

  handleOnCategorySelect = (e) => {
    let category = e.target.value

    this.setState(prevState => ({
      post: {
        ...prevState.post,
        category
      }
    }))
  }

  handleOnAuthorChange = (e) => {
    let author = e.target.value

    this.setState(prevState => ({
      post: {
        ...prevState.post,
        author
      }
    }))
  }

  handleSubmitEditing = (e) => {
    e.preventDefault()

    const { dispatch } = this.props
    const { post } = this.state

    dispatch(handleEditPost(post))

    this.setState({
      redirectToPost: true
    })
  }

  handleSubmitAdding = (e) => {
    e.preventDefault()

    const { dispatch } = this.props
    const { post } = this.state

    // Populate the rest of the required properties
    post.id = getNewId()
    post.timestamp = getTimestamp()

    dispatch(handleAddPost(post))

    this.setState({
      redirectToHome: true
    })
  }

  render() {
    if (this.state.redirectToPost) {
      return <Redirect to={`/posts/${this.state.post.id}`} />
    }

    if (this.state.redirectToHome) {
      return <Redirect to='/' />
    }

    const { post } = this.state
    console.log({ post })

    if (post.id !== '') {
      return (
        <form>
          <h3>EDITING POST</h3>
          <FieldGroup
            id='f-post-title'
            type='text'
            label='Title'
            placeholder='Enter a title'
            value={post.title}
            onChange={this.handleOnTitleChange}
          />

          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Body</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Enter a body"
              value={post.body}
              onChange={this.handleOnBodyChange} />
          </FormGroup>

          <Button
            type='submit'
            onClick={this.handleSubmitEditing}
          >Update Post</Button>
        </form>
      )
    } else {
      return (
        <div>
          <h3>NEW POST</h3>
          <FieldGroup
            id='f-post-title'
            type='text'
            label='Title'
            placeholder='Enter a title'
            value={post.title}
            onChange={this.handleOnTitleChange}
          />

          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Body</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Enter a body"
              value={post.body}
              onChange={this.handleOnBodyChange} />
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Category</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="Select a category"
              value={post.category}
              onChange={this.handleOnCategorySelect}
            >
              <option key='empty' value=''></option>
              {
                this.props.categories.map(cat =>
                  <option key={cat.path} value={cat.path}>
                    {cat.name}
                  </option>
                )
              }
            </FormControl>
          </FormGroup>

          <FieldGroup
            id='f-post-author'
            type='text'
            label='Author'
            placeholder='Enter an author'
            value={post.author}
            onChange={this.handleOnAuthorChange}
          />

          <Button
            type='submit'
            onClick={this.handleSubmitAdding}
          >Add Post</Button>
        </div>
      )
    }
  }
}

function mapStateToProps({ posts, categories }, props) {
  const { postId } = props.match.params

  return {
    post: posts.filter(o => o.id === postId)[0],
    categories
  }
}

export default connect(mapStateToProps)(NewPost)