import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';

const ManageBooks = () => {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await fetch('/api/books');
        const data = await response.json();
        setBooks(data);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const addBook = (newBook) => {
        setBooks([...books, newBook]);
    };

    const updateBook = (updatedBook) => {
        setBooks(books.map(book => (book._id === updatedBook._id ? updatedBook : book)));
    };

    const deleteBook = (id) => {
        setBooks(books.filter(book => book._id !== id));
    };

    return (
        <div>
            <h1>Manage Books</h1>
            <BookForm addBook={addBook} />
            <BookList books={books} updateBook={updateBook} deleteBook={deleteBook} />
        </div>
    );
};

export default ManageBooks;