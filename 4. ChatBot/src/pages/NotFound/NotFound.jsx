// src/pages/NotFound/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';
import { assets } from '../../assets/assets';

const NotFound = () => {
    return (
        <div className="not-found">
            <img src={assets.error404_img} />
            <div className='left'>
                <div>
                    <h2>Opps, looks like <br />you are lost</h2>
                    <p>The page you are looking for does not exist.</p>
                </div>
                <Link to="/">Go to Home</Link>
            </div>
        </div>
    );
};

export default NotFound;
