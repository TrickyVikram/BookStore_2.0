import React from 'react';
import BookCarousel from './BookCarousel';

const BooksDropdown = ({ topics, onSelectBook }) => {
    return (
        <div className="mb-4">
            <h5>Select a Book</h5>
            <select className="form-select" onChange={(e) => onSelectBook(e.target.value)}>
                <option value="">Select a book</option>
                {topics.flatMap(topic => 
                    topic.books.map(book => (
                        <option key={book.id} value={book.id}>
                            {book.name}
                        </option>
                    ))
                )}
            </select>
        </div>
    );
};

export default BooksDropdown;
