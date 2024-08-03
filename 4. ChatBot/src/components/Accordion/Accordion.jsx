import React, { useState } from 'react';
import './Accordion.css';
import { assets } from '../../assets/assets';

const Accordion = ({ prompt, response }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion-item">
            <div className="accordion-title" onClick={toggleAccordion}>
            <h3>{prompt}</h3>
                <img 
                    src={assets.nav_arrow} 
                    className={isOpen ? 'rotate-icon' : ''} 
                    alt="Toggle Arrow"
                />
            </div>
            {isOpen && (
                <div className="accordion-content">
                    {response}
                </div>
            )}
        </div>
    );
};

export default Accordion;
