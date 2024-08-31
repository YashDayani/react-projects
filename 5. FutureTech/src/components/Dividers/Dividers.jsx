import React from 'react'
import { assets } from '../../assets/assets'
import './Dividers.css'

const Dividers = (props) => {
  return (
    <section className="divider" id={props.id}>
        <div className='divider-left'>
            <div className="subtitle"> {props.subtitle} </div>
            <div className="title"> {props.title} </div>
        </div>
        <div className='link-btn'><a href="#"> {props.linktext} <img className='up_arror_img' src={assets.up_arrow} alt="" /></a></div>
    </section>
  )
}

export default Dividers
