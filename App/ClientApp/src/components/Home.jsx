import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import * as constants from '../utils/constants.js'
import TableView from './TableView';
import GalleryView from './GalleryView';

const App = () => {
    const [language, setLanguage] = useState(constants.DEFAULT_LANGUAGE);
    const [seed, setSeed] = useState(constants.DEFAULT_SEED);
    const [likes, setLikes] = useState(constants.DEFAULT_LIKES);
    const [reviews, setReviews] = useState(constants.DEFAULT_REVIEWS);
    const [page, setPage] = useState(constants.DEFAULT_PAGE);
    const [books, setBooks] = useState(constants.DEFAULT_BOOKS);
    const [hasMore, setHasMore] = useState(constants.DEFAULT_HAS_MORE);
    const [expandedBook, setExpandedBook] = useState(constants.DEFAULT_EXPANDED_BOOK);
    const [view, setView] = useState(constants.TABLE_VIEW_NAME);

    useEffect(() => {
        fetchBooks();
    }, [language, seed, likes, reviews]);

    const fetchBooks = async () => {
        const response = await axios.get(constants.API_URL, {
            params: { language, seed, likes, reviews, page, pageSize: constants.PAGE_SIZE }
        });
        setBooks(response.data);
        setHasMore(response.data.length === constants.PAGE_SIZE);
    };

    const handleLoadMore = async () => {
        const nextPage = page + 1;
        const response = await axios.get(constants.API_URL, {
            params: { language, seed, likes, reviews, page: nextPage, pageSize: constants.PAGE_SIZE }
        });
        setBooks(prev => [...prev, ...response.data]);
        setPage(nextPage);
        setHasMore(response.data.length === constants.PAGE_SIZE);
    };

    const handleRandomSeed = () => {
        setSeed(Math.floor(Math.random() * 1000000));
    };

    const toggleExpand = (index) => {
        setExpandedBook(expandedBook === index ? null : index);
    };

    const csvHeaders = [
        { label: "Index", key: "index" },
        { label: "ISBN", key: "isbn" },
        { label: "Title", key: "title" },
        { label: "Author", key: "author" },
        { label: "Publisher", key: "publisher" }
    ];

    const csvData = books.map((book, index) => ({
        index: index + 1,
        isbn: book.isbn,
        title: book.title,
        author: book.author,
        publisher: book.publisher
    }));

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Books</h2>
            <div className="card p-3 mb-4 sticky-top">
                <div className="row g-3 align-items-center">
                    <div className="col-md-3">
                        <label className="form-label">Language</label>
                        <select className="form-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                            <option value="en">English (USA)</option>
                            <option value="de">German (Germany)</option>
                            <option value="es">Spanish (Spain)</option>
                            <option value="it">Italian (Italy)</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Seed</label>
                        <div className="input-group">
                            <input type="number" className="form-control" value={seed} onChange={(e) => setSeed(Number(e.target.value))} />
                            <button className="btn btn-outline-secondary" onClick={handleRandomSeed}>🔀</button>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Likes</label>
                        <input type="range" className="form-range" min="0" max="10" step="0.1" value={likes} onChange={e => setLikes(Number(e.target.value))} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Reviews</label>
                        <input type="number" className="form-control" step="0.1" value={reviews} onChange={(e) => setReviews(Number(e.target.value))} />
                    </div>
                </div>
                <div className="text-center mt-3">
                    <CSVLink className="btn btn-success me-2" headers={csvHeaders} data={csvData} filename={`${constants.FILE_NAME_CSV}${page}.csv`}>
                        Export Current Page to CSV
                    </CSVLink>
                    <button className="btn btn-primary me-2" onClick={() => setView(constants.TABLE_VIEW_NAME)}>Table View</button>
                    <button className="btn btn-secondary" onClick={() => setView(constants.GALLERY_VIEW_NAME)}>Gallery View</button>
                </div>

            </div>

            <InfiniteScroll
                dataLength={books.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={<div className="text-center my-3"><span className="spinner-border text-primary"></span> Loading...</div>}
            >
                {view === constants.TABLE_VIEW_NAME && <TableView books={books} expandedBook={expandedBook} toggleExpand={toggleExpand} />}
                {view === constants.GALLERY_VIEW_NAME && <GalleryView books={books} />}
            </InfiniteScroll>
        </div>


    );
};

export default App;
