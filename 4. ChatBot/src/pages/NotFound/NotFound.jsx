import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context'; 

const NotFound = () => {
    const { theme } = useContext(Context); 

    
    const errorImage = theme === 'night' ? assets.error404_dark_img : assets.error404_img;

    
    console.log('Current theme:', theme);
    console.log('Selected image:', errorImage);

    return (
        <div className="not-found">
            <img src={errorImage} alt="404 Error" />
            <div className='left'>
                <div>
                    <h2>Oops, looks like <br />you are lost</h2>
                    <p>The page you are looking for does not exist.</p>
                </div>
                <Link to="/">Go to Home</Link>
            </div>
        </div>
    );
};

export default NotFound;
