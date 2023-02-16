import React from 'react'
import './Loader.css'
import logo from './assets/logo.webp'

//this is basic loader in which can show any msg
function Loader({ msg }) {
    return (
        <div className="loaderContainer">
            <img className='logo' src={logo} alt="logo" />
            <h3 className='loadingHeader'>{msg}</h3>
        </div>
    )
}

export default Loader