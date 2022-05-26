import React from 'react'
import './CardContainer.styles.css'


function CardContainer({children, cardSize}) {
  return (
    <section className='card-container' 
      style={{ 'gridTemplateColumns': `repeat(auto-fill, minmax(${cardSize}px, 1fr))`}}
      
    >
        {children}
    </section>
  )
}

export default CardContainer