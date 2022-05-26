import React from 'react'
import './Alert.styles.css'


const Alert = ({type, text}) => {
  return (
    <div 
        className='alert-container'
        style={{
            backgroundColor: `${type === 'warning' ? '#f0a7a1' : '#ffecb3' }`,
            color: `${type === 'warning' ? '#a12f2e' : '#91830c'}`}}
    >
        {text}
    </div>
  )
}

Alert.defaultProps = {
    type: 'info'
}

export default Alert