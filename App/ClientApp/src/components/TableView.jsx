import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const TableView = ({ books, expandedBook, toggleExpand }) => {
    return (
        <table className="table table-striped table-hover">
            <thead className="table-dark">
                <tr>
                    <th>#</th>
                    <th>ISBN</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => (
                    <React.Fragment key={index}>
                        <tr onClick={() => toggleExpand(index)} style={{ cursor: 'pointer' }}>
                            <td>{index + 1}</td>
                            <td>{book.isbn}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                            <td>{expandedBook === index ? <FaChevronUp /> : <FaChevronDown />}</td>
                        </tr>
                        {expandedBook === index && (
                            <tr>
                                <td colSpan="6">
                                    <div className="p-3 border rounded bg-light d-flex">
                                        <div>
                                            <img src={book.image} alt={book.title} className="me-3" style={{ width: '120px', height: '180px', objectFit: 'cover' }} />
                                            <h5>{book.likes} 👍</h5>
                                        </div>
                                        <div>
                                            <h5>{book.title} <small className="text-muted">({book.format})</small></h5>
                                            <p><strong>by {book.author}</strong></p>
                                            <p><i>{book.publisher}, {book.year}</i></p>
                                            <h6>Review</h6>
                                            {book.reviews.map((review, i) => (
                                                <p key={i}><em>"{review.message}"</em> — {review.fullName}</p>
                                            ))}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
};

export default TableView;
