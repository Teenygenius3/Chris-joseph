import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const BookDelete = ({ bookId, onDelete }) => {
    const history = useHistory();

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/books/${bookId}`);
            onDelete(bookId);
            history.push('/manage-books'); // Redirect after deletion
        } catch (error) {
            console.error('Error deleting the book:', error);
        }
    };

    const handleCancel = () => {
        history.push('/manage-books'); // Redirect to manage books on cancel
    };

    return (
        <div className="confirmation-popup">
            <h2>Are you sure you want to delete this book?</h2>
            <button onClick={handleDelete}>Yes, Delete</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
};

export default BookDelete;