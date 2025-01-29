import React from 'react';

const GalleryView = ({ books }) => {
    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {books.map((book, index) => (
                <div className="col" key={index}>
                    <div className="card h-100">
                        <img src={book.image} className="card-img-top" alt={book.title} style={{ height: '250px', objectFit: 'cover' }} />
                        <div className="card-body">
                            <h5 className="card-title">{book.title}</h5>
                            <p className="card-text">by {book.author}</p>
                            <p className="card-text"><small className="text-muted">{book.publisher}</small></p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GalleryView;