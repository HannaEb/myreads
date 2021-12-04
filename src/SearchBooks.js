import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Book from './Book';

class SearchBooks extends Component {
  state = {
      searchTerm: '',
      foundBooks: []
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
            this.setState(() => ({
                foundBooks
            }))
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
            {foundBooks.map(foundBook => (
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

export default SearchBooks;
