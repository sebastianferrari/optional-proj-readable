import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap'
import { handleEditPost } from '../actions/posts'
import { Redirect } from 'react-router-dom'

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
    editing: false,
    post: {
      id: '',
      title: '',
      body: '',
      author: ''
    },
    redirectToPost: false
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

  // handleOnCategorySelect = (e) => {
  //   let category = e.target.value

  //   this.setState(prevState => ({
  //     post: {
  //       ...prevState.post,
  //       category
  //     }
  //   }))
  // }

  // handleOnAuthorChange = (e) => {
  //   let author = e.target.value

  //   this.setState(prevState => ({
  //     post: {
  //       ...prevState.post,
  //       author
  //     }
  //   }))
  // }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submit pressed!')

    const { dispatch } = this.props
    const { post } = this.state

    console.log('SENDING POST ON SUBMIT ', post)
    dispatch(handleEditPost(post))
    
    this.setState({
      redirectToPost: true
    })
  }

  render() {
    if (this.state.redirectToPost) {
      return <Redirect to={`/posts/${this.state.post.id}`} />
    }

    const { post } = this.state
    console.log({ post })

    if (post.id !== '') {
      // console.log('POST TITLE => ', post.title)
      return (
        <form>
          <h2>EDITING POST</h2>
          <FieldGroup
            id='f-post-title'
            type='text'
            label='Title'
            placeholder='Enter a title'
            value={post.title}
            onChange={this.handleOnTitleChange}
          />

          {/* <FormGroup>
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type='text'
              value={post.title}
              placeholder='Enter a title'
              onChange={this.handleOnTitleChange}
            />
          </FormGroup> */}

          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Body</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Enter a body"
              value={post.body}
              onChange={this.handleOnBodyChange}/>
          </FormGroup>

          {/* <FormGroup controlId="formControlsSelect">
            <ControlLabel>Category</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="Select a category"
              value={post.category}
              onChange={this.handleOnCategorySelect}
            >
              {
                this.props.categories.map(cat =>
                  <option key={cat.path} value={cat.path}>
                    {cat.name}
                  </option>
                )
              }
            </FormControl>
          </FormGroup> */}

          {/* <FieldGroup
            id='f-post-author'
            type='text'
            label='Author'
            placeholder='Enter an author'
            value={post.author}
            onChange={this.handleOnAuthorChange}
          /> */}

          <Button 
            type='submit'
            onClick={this.handleSubmit}
          >Update Post</Button>
        </form>
      )
    } else {
      return (
        <h2>NEW POST</h2>
      )
    }
  }
}

function mapStateToProps({ posts, categories }, props) {
  const { postId } = props.match.params
  console.log({postId})
  console.log('POSTS -> ', posts)
  return {
    post: posts.filter(o => o.id === postId)[0],
    categories
  }
}

export default connect(mapStateToProps)(NewPost)

// Create View
// should have a form to create new post
