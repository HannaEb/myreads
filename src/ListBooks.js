import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  } 

  render() {

    const { books, onUpdateBook } = this.props;

    //Creating the SHELVES constant was a suggested solution provided by Arun in the Knowledge forum

    const SHELVES = [
      {
        title: 'Currently Reading',
        id: 'currentlyReading'
      },
      {
        title: 'Want To Read',
        id: 'wantToRead'
      },
      {
        title: 'Read',
        id: 'read'
      }
    ]

    return (
   	  <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <ol className="shelves-grid">
            {SHELVES.map(shelf => {
              const shelfBooks = books.filter(book => book.shelf === shelf.id);
              return (
                <li key={shelf.id}>
                  <Bookshelf books={shelfBooks} onUpdateBook={onUpdateBook} shelf={shelf.title}/>
                </li>
              )
            })}
          </ol>
        </div>
        <div>
          <Link to='/search' className="open-search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;
