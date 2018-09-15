import React, { Component, Fragment } from 'react'
import LoadingBar from 'react-redux-loading'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

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
            <div className='col-md-10' style={{ backgroundColor: 'blue', color: 'white' }}>
              {JSON.stringify(this.props.posts)}
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
