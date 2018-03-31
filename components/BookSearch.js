import React, {Component} from 'react'
import {Link} from 'react-router-dom'

// Component to display search button for books search in the library
class BooksSearch extends Component {
    
  render() {
      return (
        <div className="open-search">
            <Link to='/search' onClick={this.props.onSetSearchPage}>Add a book</Link>
        </div>
      )
  }
}

export default BooksSearch;