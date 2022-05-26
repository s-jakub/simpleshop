import React, { useState } from 'react'
import './StarRating.styles.css'

import { MdStar, MdStarBorder, MdStarHalf } from 'react-icons/md'

function StarRating({type, starSize, numReviews, ratingOverall, setRatingValue}) {

    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)


  return <>
        {type === 'withDescription' ? <div className="rating">
            <div className="rating__stars-wrapper">
                {
                    Array(5).fill(0).map((_, idx) => {
                        const curVal = idx + 1;
                        return ratingOverall >= curVal ? 
                            <MdStar size={starSize} key={idx}/> :
                            Number(ratingOverall.toString().split('.')[0]) === curVal - 1 && Number(ratingOverall.toString().split('.')[1]) >= 5 ? 
                            <MdStarHalf size={starSize } key={idx}/> :
                            <MdStarBorder size={starSize} key={idx}/>


                    })
                }
            </div>
            <div className="rating__amount-reviews">
                {numReviews} ocen
            </div>
        </div>
        : type === 'interactive' ? 
        <div className='star-rating'>
            {Array(5)
                .fill(0)
                .map((_, idx) => {
                    const ratingVal = idx + 1;

                    return hover >= ratingVal || rating >= ratingVal ?  
                        <MdStar 
                            key={ratingVal}
                            className='star'
                            onClick={() => {
                                setRating(ratingVal)
                                setRatingValue(ratingVal)
                            }}
                            onMouseEnter={() => setHover(ratingVal)}
                            onMouseLeave={() => setHover(0)}
                            size={50}
                            /> 
                        : 
                        <MdStarBorder 
                            key={ratingVal}
                            className="star"
                            onClick={() => {
                                setRating(ratingVal)
                                setRatingValue(ratingVal)
                            }}
                            onMouseEnter={() => setHover(ratingVal)}
                            onMouseLeave={() => setHover(0)}
                            size={50}
                        />
                        
                    
                })
            }
        </div>
        : 
        <div className="rating">
            <div className="rating__stars-wrapper">
            {
                Array(5).fill(0).map((_, idx) => {
                    const curVal = idx + 1;
                    return ratingOverall >= curVal ? 
                        <MdStar size={starSize} key={idx}/> :
                        Number(ratingOverall.toString().split('.')[0]) === curVal - 1 && Number(ratingOverall.toString().split('.')[1]) >= 5 ? 
                        <MdStarHalf size={starSize } key={idx}/> :
                        <MdStarBorder size={starSize} key={idx}/>


                })
            }
            </div>
        </div>
        }
    </>
}

StarRating.defaultProps = {
    type: 'withDescription',
    starSize: 50,
    numReviews: 0,
    ratingOverall: 0,
}

export default StarRating