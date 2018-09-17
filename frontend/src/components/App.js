import React, { Component, Fragment } from 'react'
import LoadingBar from 'react-redux-loading'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CategoryPosts from './CategoryPosts'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import './App.css'
import Post from './Post'

const NavAndRoutes = () => (
  <Fragment>
    <Nav />
    <div>
      <Route path='/' exact component={Home} />
      <Route path='/category/:category' exact component={CategoryPosts} />
      <Route path='/post/add' exact component={NewPost} />
      <Route path='/post/edit/:postId' exact component={NewPost} />
      <Route path='/post/:postId' exact component={Post} />
    </div>
  </Fragment>
)

class App extends Component {
  componentDidMount() {
    this.props.getData()
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <NavAndRoutes />
          </div>
        </Fragment>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getData: () => dispatch(handleInitialData())
  }
}

function mapStateToProps({ posts, categories }) {
  return {
    posts,
    categories,
    loading: posts.length === 0
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
