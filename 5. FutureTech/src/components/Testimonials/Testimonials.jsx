import React from 'react';
import Dividers from '../Dividers/Dividers';
import { assets } from '../../assets/assets'; // Ensure this points to the assets folder if needed
import { testimonialsData } from './Data'; // Import the data file
import './Testimonials.css';

const Testimonials = () => {
  return (
    <div>
      <Dividers
        title="Real Words from Real Readers"
        subtitle="What Our Readers Say"
        linktext="View All Testimonials"
        id="testimonials"
      />
      <div className="testimonials">
        {testimonialsData.map((testimonial, index) => (
          <div className="card" key={index}>
            <div className="top">
              <img src={assets[testimonial.image]} alt={testimonial.name} />
              <div>
                <div className="name">{testimonial.name}</div>
                <div className="address">{testimonial.address}</div>
              </div>
            </div>
            <div className="bottom">
              <div className="ratings">
                <img src={assets[testimonial.ratingImage]} alt="ratings" />
              </div>
              <div className="review">
                {testimonial.review}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;