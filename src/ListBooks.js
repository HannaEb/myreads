import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class ListBooks extends Component {
  render() {

    const { books, onUpdateBook } = this.props;

    const currentlyReading = books.filter(book => {
      return book.shelf === 'currentlyReading'
    })

    const wantToRead = books.filter(book => {
      return book.shelf === 'wantToRead'
    })

    const read = books.filter(book => {
      return book.shelf === 'read'
    })

    return (
   	  <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReading.map(book => (
                    <li>
                      <Book key={book.id} book={book} onUpdateBook={onUpdateBook} />
                    </li>
                  ))} 
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToRead.map(book => (
                    <li>
                      <Book key={book.id} book={book} onUpdateBook={onUpdateBook} />
                    </li>
                  ))} 
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {read.map(book => (
                    <li>
                      <Book key={book.id} book={book} onUpdateBook={onUpdateBook} />
                    </li>
                  ))} 
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Link to='/search' className="open-search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;
