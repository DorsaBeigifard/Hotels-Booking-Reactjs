import React from "react";

function Reviews() {
  return (
    <div className="section-spacing container mx-auto">
      <div className="text-center mb-8">
        <h2>Customer Reviews</h2>
        <p className="text-gray-600 mt-2">
          Hear what our guests have to say about their stays.
        </p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div>
          <img className="rounded-full h-15 mb-4" src="images/person_1.jpg" />
          <p className="text-gray-700 italic mb-4">
            “Booking was effortless, and the hotel was just as described. The
            staff was incredibly helpful, making my stay truly enjoyable.”
          </p>
          <p className="italic text-gray-400">— Clare Gupta</p>
        </div>
        <div>
          <img className="rounded-full h-15 mb-4" src="images/person_2.jpg" />
          <p className="text-gray-700 italic mb-4">
            “A fantastic experience! The hotel was in the perfect location, and
            the recommendations provided were spot-on.”
          </p>
          <p className="italic text-gray-400">— Rogie Slater</p>
        </div>
        <div>
          <img className="rounded-full h-15 mb-4" src="images/person_3.jpg" />
          <p className="text-gray-700 italic mb-4">
            “Seamless booking and a wonderful stay! The rooms were clean, and
            the customer service was top-notch.”
          </p>
          <p className="italic text-gray-400">— John Doe</p>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
