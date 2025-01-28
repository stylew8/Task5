import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { fetchBooks } from "@/utils/bookGenerator";
import InfiniteScroll from "react-infinite-scroll-component";

export function BookstoreApp() {
    const [language, setLanguage] = useState("en-US");
    const [seed, setSeed] = useState(Math.floor(Math.random() * 1000000));
    const [likes, setLikes] = useState(3.7);
    const [reviews, setReviews] = useState(4.7);
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchBooks(language, seed, likes, reviews, 1).then(setBooks);
    }, [language, seed, likes, reviews]);

    const loadMoreBooks = () => {
        fetchBooks(language, seed, likes, reviews, page + 1).then(newBooks => {
            if (newBooks.length === 0) {
                setHasMore(false);
            } else {
                setBooks(prevBooks => [...prevBooks, ...newBooks]);
                setPage(page + 1);
            }
        });
    };

    return (
        <div className="p-4">
            <div className="flex space-x-4 mb-4">
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="en-US">English (US)</option>
                    <option value="de-DE">German (Germany)</option>
                    <option value="fr-FR">French (France)</option>
                </select>
                <Input type="number" value={seed} onChange={(e) => setSeed(Number(e.target.value))} />
                <Button onClick={() => setSeed(Math.floor(Math.random() * 1000000))}>🔀</Button>
                <Slider value={likes} min={0} max={10} step={0.1} onChange={setLikes} />
                <Slider value={reviews} min={0} max={10} step={0.1} onChange={setReviews} />
            </div>
            <InfiniteScroll
                dataLength={books.length}
                next={loadMoreBooks}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>ISBN</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Publisher</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book, index) => (
                            <TableRow key={book.isbn}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{book.isbn}</TableCell>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>{book.publisher}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </InfiniteScroll>
        </div>
    );
}