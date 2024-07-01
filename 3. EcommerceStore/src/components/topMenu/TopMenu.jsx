import React from 'react'
import './topmenu.css'

const TopMenu = () => {
  return (
    <div className="topMenu container" id="top">
        <div className="topMenu-selector">
            <select className='topMenu-select' name="currency" id="currency">
                <option value="usd">USD</option>
                <option value="inr">INR</option>
                <option value="eur">EUR</option>
                <option value="yen">YEN</option>
            </select>

            <select className='topMenu-select' name="lang" id="lang">
                <option value="en">ENGLISH</option>
                <option value="hi">Hindi</option>
                <option value="fr">France</option>
                <option value="es">Espaniol</option>
            </select>
        </div>

        <div className='topMenu-links'>
            <ul className='topMenu-list'>
                <li>FAQ</li>
                <li>PRIVACY POLICY</li>
                <li>CONTACT US</li>
            </ul>
        </div>
    </div>
  )
}

export default TopMenu
