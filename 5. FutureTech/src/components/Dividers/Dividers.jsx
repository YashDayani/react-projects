import React from 'react'
import { assets } from '../../assets/assets'
import './Dividers.css'

const Dividers = (props) => {
  return (
    <section className="divider">
        <div className='divider-left'>
            <div className="subtitle"> {props.subtitle} </div>
            <div className="title"> {props.title} </div>
        </div>
        <div className='divider-right'><a href="#"> {props.linktext} <img src={assets.up_arrow} alt="" /></a></div>
    </section>
  )
}

export default Dividers
