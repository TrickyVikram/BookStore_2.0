import React, { useEffect, useState } from 'react';
import { getBooks } from '../../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';
import BookCarousel from './BookCarousel';
import BookCard from './BookCard';

const Sidebar = () => {
    const [topics, setTopics] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                const groupedBooks = groupByTopic(response.data);
                setTopics(groupedBooks);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const groupByTopic = (data) => {
        return data.map(item => ({
            topic: item.topic,
            books: item.books
        }));
    };

    const handleSelectBook = (bookId) => {
        const book = topics.flatMap(topic => topic.books).find(b => b.id === bookId);
        setSelectedBook(book);
        setSelectedTopic(topics.find(topic => topic.books.some(b => b.id === bookId)));
    };

    return (
        <div className="d-flex">
            {/* <nav className="sidebar bg-light p-3" style={{ width: '250px' }}>
                <h4 className="text-center mb-4">Topics</h4>
                <div className="accordion" id="accordionTopics">
                    {topics.map((item, index) => (
                        <div key={index} className="accordion-item mb-2">
                            <h2 className="accordion-header" id={`heading${index}`}>
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${index}`}
                                    aria-expanded="false"
                                    aria-controls={`collapse${index}`}
                                >
                                    {item.topic}
                                </button>
                            </h2>
                            <div
                                id={`collapse${index}`}
                                className="accordion-collapse collapse"
                                aria-labelledby={`heading${index}`}
                                data-bs-parent="#accordionTopics"
                            >
                                <div className="accordion-body">
                                    <ul className="list-group">
                                        {item.books.map(book => (
                                            <button 
                                                key={book.id}
                                                className="list-group-item list-group-item-action"
                                                onClick={() => handleSelectBook(book.id)}
                                            >
                                                <p>{book.title}</p>
                                            </button>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </nav> */}

            <div className="content p-4" style={{ flex: 3 }}>
                {selectedBook ? (
                    <>
                        <h2 className="text-center">Book: {selectedBook.title}</h2>
                        <BookCard book={selectedBook} />
                        <h3 className="text-center mt-4">Related Books in {selectedTopic?.topic}</h3>
                        <BookCarousel books={selectedTopic?.books || []} />
                    </>
                ) : (
                    <h2 className="text-center">Select a book to view details</h2>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
