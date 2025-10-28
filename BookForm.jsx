import React, { useState } from 'react';
import axios from 'axios';

const BookForm = ({ fetchBooks }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [publishedYear, setPublishedYear] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBook = {
            title,
            author,
            genre,
            price: parseFloat(price),
            stock: parseInt(stock),
            publishedYear: parseInt(publishedYear),
        };

        try {
            await axios.post('/api/books', newBook);
            fetchBooks(); // Refresh the book list after adding
            clearForm();
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const clearForm = () => {
        setTitle('');
        setAuthor('');
        setGenre('');
        setPrice('');
        setStock('');
        setPublishedYear('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                defaultValue={0}
            />
            <input
                type="number"
                placeholder="Published Year"
                value={publishedYear}
                onChange={(e) => setPublishedYear(e.target.value)}
            />
            <button type="submit">Add Book</button>
        </form>
    );
};

export default BookForm;