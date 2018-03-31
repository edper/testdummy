import React from 'react'
import { Route }  from 'react-router-dom'
import BooksList  from './BooksList'
import BooksSearch  from './BooksSearch'
import BooksSearchPage  from './BooksSearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends React.Component {

  // State for books and page (i.e. whether search or just main page)
  state = {
    books : [], // Array for books on the shelf
    showSearchPage: false // Flag whether to show search page or not 
  }

  /**
  * @description Get all the books from the shelf 
  */
  componentDidMount() { 
    BooksAPI.getAll().then( (books)=> { 
    	this.setState({books});
  	});
  }

  /**
  * @description Convert category from lowercase to Camel case
  * @param {string} Shelf - The shelf/category name to convert
  * @returns {string} Shelf - Converted shelf/category to Camel case
  */
  toCamelShelf(Shelf) {
    let shelf=Shelf;
    Shelf==="currentlyreading" && (shelf="currentlyReading");
    Shelf==="wanttoread" && (shelf="wantToRead");
    return shelf;
  }

  /**
  * @description Update a book category/shelf
  * @param {string} book - Book to update
  * @returns {string} shelf - Shelf/Category to move the book to
  */
  updateBookShelf = (book, shelf) => {
    // Change to Camel case before updating book shelf
    shelf=this.toCamelShelf(shelf);
    // Update Book shelf and then change state to update UI
    BooksAPI.update(book, shelf).then(()=>{
      this.setState((state)=>({      
        books: state.books.map((bk)=>bk.id === book.id ? {...bk, shelf:shelf} : bk)
      }));
    });
  }

  /**
  * @description Add a book to shelf freshly picked from the library
  * @param {string} book - Book to add
  * @returns {string} shelf - Shelf/Category to move the book to
  */
  addBookToShelf = (book, shelf) => {
    // Change to Camel case before updating book shelf
    shelf=this.toCamelShelf(shelf);
    // Update first the shelf for the new book
    book.shelf = shelf;
    // Check if book is existent
    let idx = this.state.books.findIndex(bk => bk['id'] === book.id);
    let bk = this.state.books;
    // If not found add the book then update book and change state to update UI
    if (idx===-1) {
      this.setState({books:bk.concat(book)});
      this.updateBookShelf(book,shelf);          
    }
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          // if Show Search Page display Search Page component
          <Route path="/search" render={({history})=>(
            <BooksSearchPage books={this.state.books} onSetSearchPage={
                ()=>{ this.setState({showSearchPage:false});
                      history.push("/");
                  }}
                  onAddBookToShelf={this.addBookToShelf}
                />
          )} />
        ) : (
          // if not Show Search Page display book list in the main UI
          <Route exact path="/" render={()=>(
            <div className="list-books">
              <div className="list-books-title">
                <h1>My Reads</h1>
              </div>
              <BooksList books={this.state.books} 
                onUpdateBookShelf={this.updateBookShelf}/>
              <BooksSearch onSetSearchPage={()=>this.setState({showSearchPage:true})}/>
            </div>
          )} />           
        )}
      </div>
    );
  }
}

export default App;
