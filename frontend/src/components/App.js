import React, { Component, Fragment } from 'react'
import LoadingBar from 'react-redux-loading'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import PostPreview from './PostPreview'

const CategoriesSideBar = ({ categories }) => (
  <div className='col-md-2' style={{ backgroundColor: 'green', color: 'white' }}>
    Categories
  </div>
)

class App extends Component {
  componentDidMount() {
    this.props.getData()
  }

  render() {
    return (
      <Fragment>
        <LoadingBar />
        <div className='container'>
          <h1>Readable App</h1>
          <div className='row'>
            <CategoriesSideBar />
            <div className='col-md-10'>
              {this.props.posts && this.props.posts.map(post => (
                // todo: hide posts marked as deleted.
                <PostPreview post={post} key={post.id} />
              ))}
          </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getData: () => dispatch(handleInitialData())
  }
}

function mapStateToProps({ posts }) {
  return {
    posts,
    loading: posts.length === 0
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
