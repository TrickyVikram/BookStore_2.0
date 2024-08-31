import React, { useEffect, useState } from 'react';
import { getBooks } from '../../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Make sure to include Bootstrap's JavaScript
import './Sidebar.css';
import BookList from '../BookList';

const Sidebar = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                if (response.data && Array.isArray(response.data)) {
                    const topicArray = response.data.map(item => ({
                        topic: item.topic,
                        books: Object.keys(item.books).map(key => ({
                            id: key,
                            ...item.books[key]
                        }))
                    }));
                    setTopics(topicArray);
                } else {
                    console.error('Invalid response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleSelectBook = (bookId) => {
        const selectedBook = topics.flatMap(topic => topic.books).find(b => b.id === bookId);
        console.log('Selected Book:', selectedBook); // for debugging or use as needed
    };

    return (
        <div className="d-flex">
            <nav className="sidebar card h-100 bg-light p-3" style={{ width: '250px' }}>
                <h4 className="text-center mb-4">Topics</h4>
                <div className="accordion" id="accordionTopics">
                    {topics.length > 0 ? topics.map((item, index) => (
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
                                            book.title ? (
                                                <button 
                                                    key={book.id}
                                                    className="list-group-item list-group-item-action"
                                                    onClick={() => handleSelectBook(book.id)}
                                                >
                                                    <span>{book.title}</span>
                                                </button>
                                            ) : (
                                                <li key={book.id} className="list-group-item">
                                                    <span>No data available for {book.id}</span>
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center">No topics available</p>
                    )}
                </div>
            </nav>

            <div className="col-md-10">
                <div className="card h-100 d-flex shadow-lg bg-white rounded">
               
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
