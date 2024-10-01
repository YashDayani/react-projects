
import React from 'react';
import './Popup.css';

const Popup = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-overlay-wrapper">
                <div className="popup-header">

                </div>
                <div className="popup-content">
                    <p>{message}</p>
                </div>
                <div className="popup-buttons">
                    <div className="popup-buttons-wrapper">
                        <button className='reqDenied' onClick={onCancel}>Nevermind</button>
                        <button className='reqAccept' onClick={onConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
