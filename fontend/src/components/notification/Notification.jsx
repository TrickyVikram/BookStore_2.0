import React from "react";
import BookCarousel from "./BookCarousel";
import "./Notification.css";



const Notification = () => {
  const purchasedBookId = false; // Replace 'true' with the actual value or condition

  return (
    <>
      <div className="notification-container">
        {/* Use the carousel component inside the notification */}
        <BookCarousel />
      </div>
      { purchasedBookId && (
        <div className="notification-container1">
          <p>Book purchased successfully!</p>
        </div>
      )}
    </>
  );
};

export default Notification;
