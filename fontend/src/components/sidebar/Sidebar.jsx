import React, { useEffect, useState } from 'react';
import { getBooks } from '../api/api'; // Ensure this API call is set up correctly
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; // Custom CSS for additional styling

const Sidebar = () => {
    const [topics, setTopics] = useState([]);

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

    const groupByTopic = (books) => {
        const topicsMap = {};

        books.forEach((book) => {
            if (!topicsMap[book.topic]) {
                topicsMap[book.topic] = [];
            }
            topicsMap[book.topic].push(book);
        });

        return Object.entries(topicsMap).map(([topic, books]) => ({
            topic,
            books
        }));
    };

    return (
        <div className="d-flex">
            <nav className="sidebar bg-light p-3">
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
                                        {item.books.map((book) => (
                                            <li key={book._id} className="list-group-item">
                                                {book.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
            <div className="content p-4">
                {/* Main content area for displaying book details */}
                <h2 className="text-center">Select a topic to view books</h2>
            </div>
        </div>
    );
};

export default Sidebar;
