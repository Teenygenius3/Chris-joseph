import React, { useEffect, useState } from 'react';
import axios from 'axios';

// API instance
const api = axios.create({ baseURL: 'http://localhost:8080/api' });

const EmptyBook = {
    title: '',
    author: '',
    genre: '',
    price: '',
    stock: ''
};

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [editingBook, setEditingBook] = useState(null); // null -> add

    const [showDelete, setShowDelete] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.get('/books');
            setBooks(res.data || []);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch books from API.');
        } finally {
            setLoading(false);
        }
    };

    const openAdd = () => {
        setEditingBook(null);
        setShowModal(true);
    };

    const openEdit = (book) => {
        setEditingBook(book);
        setShowModal(true);
    };

    const openDelete = (book) => {
        setBookToDelete(book);
        setShowDelete(true);
    };

    const handleSave = async (book) => {
        try {
            if (book._id) {
                await api.put(`/books/${book._id}`, book);
            } else {
                await api.post('/books', book);
            }
            await fetchBooks();
            setShowModal(false);
        } catch (err) {
            console.error('Save failed', err);
            alert('Failed to save book. See console for details.');
        }
    };

    const confirmDelete = async () => {
        if (!bookToDelete) return;
        try {
            await api.delete(`/books/${bookToDelete._id}`);
            setShowDelete(false);
            setBookToDelete(null);
            await fetchBooks();
        } catch (err) {
            console.error('Delete failed', err);
            alert('Failed to delete book. See console for details.');
        }
    };

    // Calculate quick stats
    const stats = books.reduce((acc, book) => {
        acc.totalBooks = acc.totalBooks + 1;
        acc.totalValue += book.price * book.stock;
        acc.outOfStock += book.stock === 0 ? 1 : 0;
        if (!acc.genres[book.genre]) acc.genres[book.genre] = 0;
        acc.genres[book.genre]++;
        return acc;
    }, { totalBooks: 0, totalValue: 0, outOfStock: 0, genres: {} });

    return (
        <div className="container-fluid py-4">
            <div className="row">
                {/* Sidebar */}
                <div className="col-lg-3">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h5 className="card-title h5 mb-4">Quick Stats</h5>
                            <div className="d-flex flex-column gap-3">
                                <div className="border-start border-4 border-primary px-3 py-2">
                                    <div className="small text-muted">Total Books</div>
                                    <div className="h4 mb-0">{stats.totalBooks}</div>
                                </div>
                                <div className="border-start border-4 border-success px-3 py-2">
                                    <div className="small text-muted">Total Value</div>
                                    <div className="h4 mb-0">${stats.totalValue.toFixed(2)}</div>
                                </div>
                                <div className="border-start border-4 border-warning px-3 py-2">
                                    <div className="small text-muted">Out of Stock</div>
                                    <div className="h4 mb-0">{stats.outOfStock}</div>
                                </div>
                            </div>

                            <h6 className="mt-4 mb-3">Genres</h6>
                            <div className="d-flex flex-column gap-2">
                                {Object.entries(stats.genres).map(([genre, count]) => (
                                    <div key={genre} className="d-flex justify-content-between align-items-center">
                                        <span className="text-muted">{genre || 'Uncategorized'}</span>
                                        <span className="badge bg-secondary">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-lg-9">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <div>
                            <h1 className="display-5 mb-1">Book Inventory</h1>
                            <p className="text-muted mb-0">Manage your collection efficiently</p>
                        </div>
                        <div>
                            <button className="btn btn-primary" onClick={openAdd}>
                                <i className="bi bi-plus-lg me-2"></i>Add New Book
                            </button>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary mb-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="text-muted mb-0">Loading your book collection...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            <div>{error}</div>
                        </div>
                    )}

                    {/* Books Grid */}
                    {!loading && !error && (
                        <div className="row g-4">
                            {books.length === 0 ? (
                                <div className="col-12">
                                    <div className="card border-dashed">
                                        <div className="card-body text-center py-5">
                                            <div className="display-1 text-muted mb-4">📚</div>
                                            <h3>Your collection is empty</h3>
                                            <p className="text-muted mb-4">Add your first book to get started!</p>
                                            <button className="btn btn-primary" onClick={openAdd}>
                                                <i className="bi bi-plus-lg me-2"></i>Add New Book
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                books.map((book) => (
                                    <div key={book._id || book.id} className="col-md-6 col-xl-4">
                                        <div className="card h-100 shadow-sm">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <h5 className="card-title mb-0 me-2">{book.title}</h5>
                                                    <div className="dropdown">
                                                        <button className="btn btn-link btn-sm p-0 text-muted" type="button" data-bs-toggle="dropdown">
                                                            <i className="bi bi-three-dots-vertical"></i>
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                            <li><button className="dropdown-item" onClick={() => openEdit(book)}>Edit</button></li>
                                                            <li><button className="dropdown-item text-danger" onClick={() => openDelete(book)}>Delete</button></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <h6 className="text-muted mb-3">by {book.author}</h6>
                                                
                                                <div className="d-flex gap-3 text-muted small mb-3">
                                                    {book.genre && (
                                                        <span>
                                                            <i className="bi bi-bookmark me-1"></i>
                                                            {book.genre}
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <div className="row g-2 text-center">
                                                    <div className="col-6">
                                                        <div className="bg-light rounded p-2">
                                                            <div className="small text-muted mb-1">Price</div>
                                                            <strong>${typeof book.price === 'number' ? book.price.toFixed(2) : book.price}</strong>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="bg-light rounded p-2">
                                                            <div className="small text-muted mb-1">Stock</div>
                                                            <strong className={book.stock === 0 ? 'text-danger' : ''}>{book.stock}</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <AddEditBookModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                    initialBook={editingBook || EmptyBook}
                />
            )}

            {/* Delete Confirm Modal */}
            {showDelete && (
                <DeleteConfirmModal
                    show={showDelete}
                    book={bookToDelete}
                    onCancel={() => setShowDelete(false)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

const AddEditBookModal = ({ show, onClose, onSave, initialBook }) => {
    const [book, setBook] = useState({ ...initialBook });

    useEffect(() => {
        setBook({ ...initialBook });
    }, [initialBook]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // convert numeric fields
        const payload = {
            ...book,
            price: book.price === '' ? 0 : parseFloat(book.price),
            stock: book.stock === '' ? 0 : parseInt(book.stock, 10)
        };
        onSave(payload);
    };

    return (
        <div className={`modal fade ${show ? 'd-block show' : ''}`} tabIndex="-1" role="dialog" style={{ backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{book._id ? 'Edit Book' : 'Add New Book'}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input name="title" className="form-control" value={book.title} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Author</label>
                                <input name="author" className="form-control" value={book.author} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Genre</label>
                                <input name="genre" className="form-control" value={book.genre} onChange={handleChange} />
                            </div>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <label className="form-label">Price</label>
                                    <input name="price" type="number" step="0.01" className="form-control text-end" value={book.price} onChange={handleChange} />
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="form-label">Stock</label>
                                    <input name="stock" type="number" className="form-control text-end" value={book.stock} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary">{book._id ? 'Update Book' : 'Add Book'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const DeleteConfirmModal = ({ show, book, onCancel, onConfirm }) => {
    if (!book) return null;
    return (
        <div className={`modal fade ${show ? 'd-block show' : ''}`} tabIndex="-1" role="dialog" style={{ backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
            <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Book</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete <strong>{book.title}</strong> by <em>{book.author}</em>?</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                        <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;