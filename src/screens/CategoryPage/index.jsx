import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { translate } from '../../data/categories'
import { getProductsListByCategory } from '../../store/slices/productCategorySlice'

import './CategoryPage.styles.css'
import Alert from '../../components/Alert'
import CardContainer from '../../components/CardContainer'
import CardItem from '../../components/CardItem/CardItem'
import Loading from '../../components/Loading'
import Navbar from '../../containers/Navbar'
import Dropdown from '../../components/Dropdown/Dropdown'
import { manSubcategory, womanSubcategory, kidSubcategory } from '../../components/Dropdown/subcategories'


const CategoryPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { productsByCategory, status, errorMsg} = useSelector(state => state.productListByCategory);
  const {mainCategoryName, subCategoryName} = useParams()

  const [whatCategory, setWhatCategory] = useState({})

  useEffect(() => {
    if(whatCategory.mainCategory && whatCategory.subCategory){
      navigate(`/category/${whatCategory.mainCategory}/${whatCategory.subCategory}`)
    }
  }, [whatCategory, navigate])


  useEffect(() => {
    const { mainCategory, subCategory } = translate(mainCategoryName, subCategoryName)
    dispatch(getProductsListByCategory({mainCategory, subCategory}))
  }, [dispatch, mainCategoryName, subCategoryName])

  return (
      <>
      <Navbar />
        <div className='category-container'>
          <nav className="secondary-navbar">
            <Dropdown title='Mężczyzna' subcategories={manSubcategory} type='mobile' setObj={setWhatCategory} choosedMainCategory={mainCategoryName} choosedSubCategory={subCategoryName} />
            <Dropdown title='Kobieta' subcategories={womanSubcategory} type='mobile' setObj={setWhatCategory} choosedMainCategory={mainCategoryName} choosedSubCategory={subCategoryName} />
            <Dropdown title='Dziecko' subcategories={kidSubcategory} type='mobile' setObj={setWhatCategory} choosedMainCategory={mainCategoryName} choosedSubCategory={subCategoryName} />
          </nav>
          <section className='card-section'>
          {
           status === 'loading' ? <Loading /> : 
           status === 'failed' ? <Alert type='warning' text={errorMsg}/> :
           productsByCategory.length === 0 ? <Alert type='info' text="Brak przedmiotów w tej kategorii"/> :
            <CardContainer cardSize={250}>
            {
              productsByCategory.map(product => <CardItem key={product._id} product={product} />)
            }
            </CardContainer>
          
          }
          </section>

        </div>
      </>
  )
}

export default CategoryPage