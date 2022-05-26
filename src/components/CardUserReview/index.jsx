import React from 'react'
import './CardUserReview.styles.css'


import moment from 'moment'
import 'moment/locale/pl'

import StarRating from '../StarRating'

const CardUserReview = ({name, text, dateComment, rating}) => {
  return (
    <div className="user-review">
        <div className="user-review__bgc"></div>
        <div className="user-review__blur">
        <div className="user-review__nickname">{name}</div>
        <div className="user-review__star">
            <StarRating type="onlyStar" starSize={14} ratingOverall={rating}/>
        </div>
        <div className="user-review__date">{moment(dateComment).calendar()}</div>
        <p className="user-review__text">
            {text}
        </p>
        </div>
    </div>
  )
}

export default CardUserReview