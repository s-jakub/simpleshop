import React, { useEffect, useState } from 'react'

import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import './Dropdown.styles.css'


const Subcategory = ({subcategory, setObj, mainCategory, choosedSubCategory, choosedMainCategory}) => {

    const [isMenuClicked, setIsMenuClicked] = useState(false)

    let findSubcategory = subcategory.items.find(item => item === choosedSubCategory)

    useEffect(() => {
      if(findSubcategory) {
        setIsMenuClicked(true)
      }
    }, [choosedSubCategory, findSubcategory])

  return (
    <div className="subcategory-mobile__col" >
        <div className="dropdown-mobile__wrapper" onClick={() => setIsMenuClicked(!isMenuClicked)}>
            <div className="subcategory-mobile__title">{subcategory.title}</div>
            {!isMenuClicked && <AiOutlinePlus size={20} /> }
            {isMenuClicked && <AiOutlineMinus size={20} /> }
        </div>
        {isMenuClicked && <>
        {
            subcategory.items.map((itemName, itemIdx) => <div key={itemIdx} className={`subcategory-mobile__item ${findSubcategory === itemName && choosedMainCategory === mainCategory? 'active-category' : ''}`} 
            
            onClick={() => {
              setObj({mainCategory: mainCategory, subCategory: itemName })
              window.document.body.style.overflow = "auto";
            }} >{itemName}</div> )       
        }
        </> }
    
    </div>
  )
}

export default Subcategory