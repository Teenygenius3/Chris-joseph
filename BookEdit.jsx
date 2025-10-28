import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookEdit = ({ bookId, onClose, onUpdate }) => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        genre: '',
        price: '',
        stock: '',
        publishedYear: ''
    });

    useEffect(() => {
        const fetchBook = async () => {
            const response = await axios.get(`/api/books/${bookId}`);
            setBook(response.data);
        };
        fetchBook();
    }, [bookId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`/api/books/${bookId}`, book);
        onUpdate();
        onClose();
    };

    return (
        <div className="modal">
            <h2>Edit Book</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                />
                <input
                    type="text"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                    placeholder="Author"
                    required
                />
                <input
                    type="text"
                    name="genre"
                    value={book.genre}
                    onChange={handleChange}
                    placeholder="Genre"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={book.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                />
                <input
                    type="number"
                    name="stock"
                    value={book.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                />
                <input
                    type="number"
                    name="publishedYear"
                    value={book.publishedYear}
                    onChange={handleChange}
                    placeholder="Published Year"
                />
                <button type="submit">Update Book</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default BookEdit;