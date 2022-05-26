import React from 'react'
import './Loading.styles.css'


const Loading = () => {
  return (
    <div className='loading-container'>
        <div className="loading-circle">
            <div className="inner-circle"></div>
            <div className="space-loading"></div>
        </div>
        <div className="loading-text">
            Loading 
            <span className="dot dot-1">.</span> 
            <span className="dot dot-2">.</span> 
            <span className="dot dot-3">.</span> 
        </div>
    </div>
  )
}

export default Loading