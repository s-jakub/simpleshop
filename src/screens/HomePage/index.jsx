import React, { useEffect } from 'react'
import './HomePage.styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../../store/slices/productSlice'

import Navbar from '../../containers/Navbar'
import CardContainer from '../../components/CardContainer'
import CardItem from '../../components/CardItem/CardItem'
import Newsletter from '../../containers/Newsletter'
import Footer from '../../containers/Footer'
import Loading from '../../components/Loading'
import Alert from '../../components/Alert'
import { useParams, Link } from 'react-router-dom'

function HomePage() {

  const dispatch = useDispatch()
  const { keyword, pageNumber } = useParams()
  const { products, status, errorMsg, page, pages } = useSelector(state => state.productList)

  useEffect(() => {
    dispatch(getProductsList({keyword, pageNumber}))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
        <Navbar />
        
          { 
            status === 'loading' ? <Loading /> 
            : status === 'failed' ? <Alert type='warning' text={errorMsg} /> 
            :
            <CardContainer cardSize={250}>
              {products.map(product => {
                return <CardItem product={product} key={product._id}/>
              })}
            </CardContainer>
          }
          <div className="pagination-wraper" >
         {
           Array(pages).fill(0).map((_, idx) => {
               return <Link key={idx} className={`pagination-item ${page === idx + 1 ? 'active-item' : '' }`} to={keyword ? `/search/${keyword}/page/${idx + 1}` : `/page/${idx + 1}` }>{idx + 1}</Link>
              })
            }
          </div> 
        <Newsletter />
        <Footer />
    </>
  )
}

export default HomePage