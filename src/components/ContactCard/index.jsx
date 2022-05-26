import React from 'react'
import './ContactCard.styles.css'

function ContactCard({title, description, children}) {

  return (
    <div className='contact-card'>
        <div className="circle-background"></div>
            <div className="contact-card__image">
                {children}
            </div>
            <h3 className="contact-card__title">{title}</h3>
            <p className="contact-card__desc">
                {description}
            </p>
    </div>
  )
}

export default ContactCard