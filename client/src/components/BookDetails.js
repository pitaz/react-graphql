import React, { useState} from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getBookQuery } from '../queries/queries';


const displayBookDetails = (props) => {
  const { book } = props.data;
  if(book) {
    return (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author</p>
        <ul className="other-books">
        {
          book.author.books.map(item => {
            return <li key={item.id}>{item.name}</li>
          })
        }
        </ul>
      </div>
    )
  } else {
    return (
      <div>No book selected...</div>
    )
  }
};

const BookDetails = (props) => {
  return (
    <div id="book-details">
    {displayBookDetails(props)}
    </div>
  );
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);
