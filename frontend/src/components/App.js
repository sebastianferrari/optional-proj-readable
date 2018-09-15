import React, { Component } from 'react';

const CategoriesSideBar = ({ categories }) => (
  <div className='col-md-2' style={{ backgroundColor: 'green', color: 'white' }}>
    Categories
  </div>
)

class App extends Component {
  render() {
    return (
      <div className='container'>
        <h1>Readable App</h1>
        <div className='row'>
          <CategoriesSideBar />
          <div className='col-md-10' style={{ backgroundColor: 'blue', color: 'white' }}>
            Posts
          </div>
        </div>
      </div>
    );
  }
}

export default App;
