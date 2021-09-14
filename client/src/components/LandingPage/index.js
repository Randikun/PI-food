import React from 'react'
import {Link} from 'react-router-dom'
import s from './landing.module.css'

export default function LandingPage(){
    return(
        <div className={`${s.landing}`}>
            <Link to='/home'>
                <div className={`${s.wrap}`}>

                <button className={`${s.button}`}>Let's cook!</button>
                </div>
            </Link>
        </div>
    )
}