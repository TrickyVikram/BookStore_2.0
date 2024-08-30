import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import BookCard from './BookCard';

const BookCarousel = ({ books }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true
    };

    return (
        <Slider {...settings}>
            {books.map(book => (
                <div key={book.id} className="p-2">
                    <BookCard book={book} />
                </div>
            ))}
        </Slider>
    );
};

export default BookCarousel;
