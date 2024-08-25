
import 'animate.css/animate.min.css';
import React, { useState, useEffect } from 'react';
import { getBooks } from '../api/api';
import useAuth from '../hooks/useAuth';  // Custom hook to determine authentication status

const localData = [
    {
        "id": "1",
        "title": "The Adventures of Captain Comet",
        "name": "Science Fiction",
        "price": 11,
        "category": "Free",
        "view": "https://ncert.nic.in/textbook/pdf/lekl126.pdf",
        "dwnd": "https://ncert.nic.in/textbook/pdf/lekl126.pdf",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUifnYjBMF6BemkUoGGN1SJ4smV3Aj1yrSSQ&s"
    },
    {
        "id": "2",
        "title": "The Secret Computer",
        "name": "Computer",
        "price": 6,
        "category": "Free",
        "dwnd": "https://ibm.docs.delinea.com/online-help/library-isvp/pdfs/delinea/secret-server/secret-server-11.1.0.pdf",
        "view": "https://ibm.docs.delinea.com/online-help/library-isvp/pdfs/delinea/secret-server/secret-server-11.1.0.pdf",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfymdB0iY-J9Yhbshr1lYJfWkuimQMjqUv-Q&s"
    },
    {
        "id": "3",
        "title": "Mastering the Art of French Cooking",
        "name": "Cooking",
        "price": 25,
        "category": "Free",
        "dwnd": "https://x.rvce.edu.in/primo-explore/uploaded-files/index_htm_files/the_art_of_french_cooking_pdf.pdf",
        "view": "https://x.rvce.edu.in/primo-explore/uploaded-files/index_htm_files/the_art_of_french_cooking_pdf.pdf",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCYaPIq4D_mlbrXrX6uZVIf6powH935s_51g&s"
    },
    {
        "id": "10",
        "title": "World History Overview",
        "name": "History",
        "price": 18,
        "category": "Free",
        "dwnd": "https://publications.iowa.gov/27598/1/World%20History%201930.pdf",
        "view": "https://publications.iowa.gov/27598/1/World%20History%201930.pdf",
        "image": "https://images.unsplash.com/photo-1550533105-d412cbf5bfcc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8V29ybGQlMjBIaXN0b3J5JTIwT3ZlcnZpZXd8ZW58MHx8MHx8fDA%3D"
    },
   
    {
        "id": "6",
        "title": "Python Programming for Beginners",
        "name": "Programming",
        "price": 12,
        "category": "Free",
        "dwnd": "https://webweb.ams3.cdn.digitaloceanspaces.com/data/simmcdev.webweb.ai.in/MCAdigitalbook/PYTHON-20240629T072453Z-001/Python%20%20Practical%20Python%20Programming%20For%20Beginners%20and%20Experts%20(%20PDFDrive%20)%20(1).pdf",
        "view": "https://webweb.ams3.cdn.digitaloceanspaces.com/data/simmcdev.webweb.ai.in/MCAdigitalbook/PYTHON-20240629T072453Z-001/Python%20%20Practical%20Python%20Programming%20For%20Beginners%20and%20Experts%20(%20PDFDrive%20)%20(1).pdf",
        "image": "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UHl0aG9uJTIwUHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D"
    },
    {
        "id": "7",
        "title": "Human",
        "name": "Lifestyle",
        "price": 9,
        "category": "Free",
        "dwnd": "https://egyankosh.ac.in/bitstream/123456789/41687/1/Unit-3.pdf",
        "view": "https://egyankosh.ac.in/bitstream/123456789/41687/1/Unit-3.pdf",
        "image": "https://media.istockphoto.com/id/1455283645/photo/old-male-friends-laughing-at-park.webp?b=1&s=612x612&w=0&k=20&c=P0VoL00O5xRa8Fs-Cqdsj5vImm83NqcD72_kULo2deE="
    },
    {
        "id": "8",
        "title": "The girl ",
        "name": "Classic",
        "price": 5,
        "category": "Free",
        "dwnd": "https://ct02210097.schoolwires.net/site/handlers/filedownload.ashx?moduleinstanceid=26616&dataid=28467&FileName=The%20Great%20Gatsby.pdf",
        "view": "https://ct02210097.schoolwires.net/site/handlers/filedownload.ashx?moduleinstanceid=26616&dataid=28467&FileName=The%20Great%20Gatsby.pdf",
        "image": "https://media.istockphoto.com/id/1353588870/photo/young-indian-woman-on-yellow-copy-space-background-stock-photo.webp?b=1&s=612x612&w=0&k=20&c=HZ7uvm-zZHgXVJb0dmbPApghCVer5KJiUoWJxkIkYZQ="
    }, 
    {
        "id": "9",
        "title": "Data Science Handbook",
        "name": "Data Science",
        "price": 20,
        "category": "Free",
        "dwnd": "https://people.smp.uq.edu.au/DirkKroese/DSML/DSML.pdf",
        "view": "https://people.smp.uq.edu.au/DirkKroese/DSML/DSML.pdf",
        "image": "https://media.istockphoto.com/id/507855413/photo/e-reader-binary-bits-showing.webp?b=1&s=612x612&w=0&k=20&c=TpexGdIyguphRe84OxqoIQdxRrBM08zupUWOha7zvnc="
    },
    {
        "id": "10",
        "title": "World History Overview",
        "name": "History",
        "price": 18,
        "category": "Free",
        "dwnd": "https://publications.iowa.gov/27598/1/World%20History%201930.pdf",
        "view": "https://publications.iowa.gov/27598/1/World%20History%201930.pdf",
        "image": "https://images.unsplash.com/photo-1550533105-d412cbf5bfcc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8V29ybGQlMjBIaXN0b3J5JTIwT3ZlcnZpZXd8ZW58MHx8MHx8fDA%3D"
    }
];


const BookList = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterData, setFilterData] = useState([]);
    const { isAuthenticated } = useAuth();  // Use custom hook or context to check authentication

    useEffect(() => {
        getBooks()
            .then(response => {
                setBooks(response.data);
                filterBooks(response.data);
            })
            .catch(error => {
                console.error(error);
                // Use localData as a fallback
                setBooks(localData);
                filterBooks(localData);
            });
    }, []);

    useEffect(() => {
        filterBooks(books);
    }, [searchQuery, books, isAuthenticated]);

    const filterBooks = (booksData) => {
        let filteredBooks;
        if (isAuthenticated) {
            filteredBooks = booksData;
        } else {
            filteredBooks = booksData.filter(book => book.category === "Free");
        }
        const searchFilteredBooks = filteredBooks.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilterData(searchFilteredBooks);
    };

    const handleBooksDownload = (bookId) => {
        if (bookId) {
            console.log('Download book with id:', bookId);
            alert(`Download book with id: ${bookId}`);
        } else {
            alert('Book ID is undefined.');
        }
    };

    const handleBooksView = (bookId) => {
        if (bookId) {
            alert(`View book with id: ${bookId}`);
        } else {
            alert('Book ID is undefined.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Book List</h2>
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="row">
                {filterData.length === 0 ? (
                    <div className="col-12 text-center">
                        <p>No books available matching your search criteria. Please try typing a different name or title.</p>
                    </div>
                ) : (
                    filterData.map(book => (
                        <div key={book.id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-lg border-0 transform hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 rounded-lg overflow-hidden">
                                <figure className="m-0">
                                    <img
                                        src={book.image}
                                        alt={book.name}
                                        className="card-img-top transition-transform duration-300 hover:scale-110"
                                        style={{ height: '300px', objectFit: 'cover', border: '1px solid red' }} // Debug: Add border for visibility
                                    />
                                </figure>
                                <div className="card-body p-4">
                                    <h5 className="card-title text-truncate">
                                        {book.name}
                                    </h5>
                                    <p className=""><span className="badge rounded-pill text-bg-info">{book.title || 'No Title'}</span></p>
                                    <span className="card-text text-muted">{book.category}</span>
                                    <div className="card-actions mt-3">
                                        {/* {isAuthenticated && ( */}
                                        <>
                                            <button
                                                className="btn btn-primary m-2 btn-block"
                                                onClick={() => handleBooksView(book.id)}
                                            >
                                                <a className='nav-link' target='blank' href={book.view} >  View</a>

                                            </button>
                                            <button
                                                className="btn btn-primary btn-block"
                                                onClick={() => handleBooksDownload(book.id)}
                                            >

                                                <a className='nav-link' target='blank' href={book.dwnd} >Download Book</a>
                                            </button>
                                        </>
                                        {/* )} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BookList;
