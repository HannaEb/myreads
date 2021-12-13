import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBooks extends Component {
  state = {
      searchTerm: '',
      foundBooks: [],
      isError: false
  }

  handleChange = searchTerm => {
      this.updateSearchTerm(searchTerm)
      this.search(searchTerm)
  }

  updateSearchTerm = searchTerm => {
      this.setState(() => ({
          searchTerm: searchTerm.trim()
      }))
  }

  search = searchTerm => {
    BooksAPI.search(searchTerm)
    .then(foundBooks => {
      if(!foundBooks || foundBooks.error) {
        this.setState({
          foundBooks: [],
          isError: true
        })
      } else {
        this.setState({
          foundBooks,
          isError: false
        })
      }
    })
  }

  render() {
    
    const { searchTerm, foundBooks } = this.state;
    const { books, onUpdateBook } = this.props;

    foundBooks.forEach(foundBook => {
      let duplicate = books.find(book => book.id === foundBook.id);
      foundBook.shelf = duplicate ? duplicate.shelf : 'none';
    })

    return (
      <div className="search-books">
        <div className="search-books-bar">
            <Link to='/' className='close-search'>Close</Link>
            <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" 
                       placeholder="Search by title or author"
                       value={searchTerm}
                       onChange={event => this.handleChange(event.target.value)} />
            </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.isError ? <p>Sorry, no books found</p>
              : foundBooks.map(foundBook => (
                <li key={foundBook.id}>
                  <Book book={foundBook} onUpdateBook={onUpdateBook} />
                </li>
            ))}  
          </ol>
        </div>
      </div>
    )
  }
}

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateBooks: PropTypes.func.isRequired
}

export default SearchBooks;
