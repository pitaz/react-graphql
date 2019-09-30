import React, { useState} from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';




const displayAuthors = (props) => {
  let data = props.getAuthorsQuery;
  if (data.loading) {
    return <option disabled>Loading Authors..</option>
  }

  return data.authors.map( author => {
    return (
      <option key={author.id} value={author.id}>{author.name}</option>
    )
  })
}

const submitForm = (e, book, props) => {
  e.preventDefault();
  props.addBookMutation({
    variables: {
      name: book.name,
      genre: book.genre,
      authorId: book.authorId
    },
    refetchQueries: [{query: getBooksQuery}]
  });
}

const AddBook = (props) => {
  const [book, setBook] = useState({
    name: '',
    genre: '',
    authorId: ''
  });

  return (
    <div>
      <form id="add-book" onSubmit={(e) => submitForm(e, book, props)}>
        <div className="field">
            <label>Book name:</label>
            <input type="text" onChange={ e => setBook({
              ...book,
              name: e.target.value
            })}/>
        </div>
        <div className="field">
            <label>Genre:</label>
            <input type="text" onChange={ e => setBook({
              ...book,
              genre: e.target.value
            })}/>
        </div>
        <div className="field">
            <label>Author:</label>
            <select onChange={ e => setBook({
              ...book,
              authorId: e.target.value
            })}>
                <option>Select author</option>
                { displayAuthors(props) }
            </select>
        </div>
        <button>+</button>

       </form>
    </div>
  );
}

export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
