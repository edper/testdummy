import React, {Component} from 'react'
import BooksShelf  from './BooksShelf'
import PropTypes from 'prop-types'

// Component to display Books in the main UI or books on the shelves
class BooksList extends Component {
   
    // Prop types for bookslist component to use
    static propTypes = {
        books : PropTypes.array.isRequired,
        onUpdateBookShelf: PropTypes.func.isRequired
      };
      
    render() {

    const { books, onUpdateBookShelf } = this.props;
    const categories = ["Currently Reading", "Want To Read", "Read"];

    return (
        <div className="list-books-content">
            <div>
                {
                    // List/Display all the books on the shelf
                    categories.map((category,index)=>(
                    <div className="bookshelf" key={index}>
                        <h2 className="bookshelf-title">{category}</h2>
                        <div className="bookshelf-books">
                            <BooksShelf 
                             books={ books.filter( 
                             (mybook)=> mybook.shelf.toLowerCase()===category.replace(/ /g,'').toLowerCase())} 
                             onUpdateBookShelf={onUpdateBookShelf}
                            />
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
        )
    }
}

export default BooksList;
