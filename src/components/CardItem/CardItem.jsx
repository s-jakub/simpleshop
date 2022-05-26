import React from 'react'
import './CardItem.styles.css'

import StarRating from '../StarRating'
import { useNavigate } from 'react-router-dom'

function CardItem({ product }) {

    const navigate = useNavigate()

  return (
      <div className='card' onClick={() => navigate(`/product/${product._id}`)}>
            <div className='card__image-wrap'>
                <div className="card__image" style={{backgroundImage: `url(${product.image})`}}></div>
            </div>
        
            <div className="item-wrapper">
                <div className='item-wrapper__name'>
                    {product.name}
                </div>
                <StarRating starSize={14} numReviews={product.numReviews} ratingOverall={product.rating}/>
                <div className="item-wrapper__price">
                    {product.price} PLN
                </div>
            </div>
        
    </div>
  )
}

export default CardItem