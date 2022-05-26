import React, { useEffect, useState } from 'react'
import './ProductPage.styles.css'

import Navbar from '../../containers/Navbar'
import Footer from '../../containers/Footer'
import Newsletter from '../../containers/Newsletter'
import Loading from '../../components/Loading'
import Alert from '../../components/Alert'

import CardUserReview from '../../components/CardUserReview'
import StarRating from '../../components/StarRating'


import { useDispatch, useSelector } from 'react-redux'
import { getProductDetail } from '../../store/slices/productDetailSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { addReview, resetAddReview } from '../../store/slices/productReviewSlice'

function ProductPage() {

  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { id } = useParams()
  const { product, status, errorMsg } = useSelector(state => state.productDetails)
  const { userInfo } = useSelector(state => state.user)
  const { status: productReviewStatus, ...productReview } = useSelector(state => state.addProductReview)

  useEffect(() => {
    
    if(productReviewStatus === 'success') {
      alert("Pomyślnie dodano recenzję")
      setRating(0)
      setComment("")
      dispatch(resetAddReview())
    }
    
    dispatch(getProductDetail(id))
  }, [dispatch, id, productReviewStatus])

  const addToCartHandler = e => {
    e.preventDefault();
    navigate(`/cart/${id}?qty=${quantity}`)
  }

  const addReviewHandler = e => {
    e.preventDefault()

    if(rating === 0) {
      alert("Aby dodać opoinie ocenia nie może być pusta")
      return
    }

    dispatch(addReview({
      productId: id,
      review: {
        rating,
        comment
      }
    }))
    
  }

  return <>
      <Navbar />
        {
          status === 'loading' ? <Loading /> :
          status === 'failed' ? <Alert type='warning' text={errorMsg} /> :
          <section className="container">
            <div className="product-wrap">
              
              <aside className="image-wrap">
                <div className="inner-wrap">
                  <img src={`${product.image}`} alt={product.name} className='image'/>
                </div>
              </aside>

              <aside className="item-wrap">
                <h2 className="item-wrap__title">{product.name}</h2>
                <p className="item-wrap__desc">
                  {product.description}
                </p>
                <div className="item-wrap__table">

                  <div className="table__row">
                    <div className="table__row__col1">
                      Cena
                    </div>
                    <div className="table__row__col2">
                      {product.price} PLN
                    </div>
                  </div>

                  <div className="table__row">
                    <div className="table__row__col1">
                      Status
                    </div>
                    <div className="table__row__col2">
                      {product.countInStock > 0 ? 'Dostępny' : 'Niedostępny' }
                    </div>
                  </div>

                  <div className="table__row">
                    <div className="table__row__col1">
                      Oceny
                    </div>
                    <div className="table__row__col2">
                      <StarRating starSize={14} ratingOverall={product.rating} numReviews={product.numReviews}/>
                    </div>
                  </div>

                  { product.countInStock > 0 && <div className="table__row">
                    <div className="table__row__col1">
                      Ilość
                    </div>
                    <div className="table__row__col2">
                      <input 
                        type="number" 
                        name="quantity" 
                        id="quantity" 
                        value={quantity} 
                        min={1} 
                        max={product.countInStock} 
                        onChange={e => {
                          Number(e.target.value) <= 0 || isNaN(Number(e.target.value)) ? setQuantity(1) : 
                          Number(e.target.value) > product.countInStock ? setQuantity(product.countInStock) : setQuantity(Number(e.target.value)) 
                          
                        }}
                        /> 
                      <span className='slash'>/</span>
                      {product.countInStock}
                    </div>
                  </div> }

                  {product.countInStock > 0 && <button className='add-to-cart-btn' onClick={addToCartHandler}>Dodaj do koszyka</button> }
            
                </div>
              </aside>
            </div>
            
            <div className="review-wrap">
              <div className="add-review">
                <h3 className="title">Dodaj recenzję produktu</h3>
                { userInfo.token ? <>
                  
                    {productReviewStatus === 'loading' && <Loading /> }
                    {productReviewStatus === 'failed' && <Alert type='warning' text={productReview.errorMsg} /> }
                    
                    <form action="#" className='form' onSubmit={addReviewHandler}>
                    
                      <StarRating type='interactive' setRatingValue={setRating}/>
                      <textarea 
                        name="add-review-input" 
                        id="add-review-input" 
                        placeholder='Bardzo ładna koszula 5/5'
                        className='form__add-review-input'
                        value={comment}
                        required
                        onChange={e => setComment(e.target.value)}
                        ></textarea>
                      <button type="submit" className='form__add-review-btn'>DODAJ</button>
                    </form>
                  
                
                  </> 
                  :
                  <Alert type='info' text='Zaloguj się aby dodać recenzję' />
                }
              </div>

              <div className="see-reviews">
                <h3 className="title">Zobacz recenzję</h3>
                {product.reviews && <div className="user-review-container">
                  {
                    product.reviews.length === 0 ? <Alert text='Produkt nie posiada żadnych recenzji' /> :
                    product.reviews.map(review => <CardUserReview key={review._id} name={review.name} dateComment={review.createdAt} text={review.comment} rating={review.rating}/>)
                  }
                </div> }
              </div>
            </div>

          </section>

        }
      <Newsletter />
      <Footer />
    </>
    
}

export default ProductPage