import React, { useEffect, useState } from 'react'
import './Dropdown.styles.css'

import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import Subcategory from './Subcategory'

function Dropdown({title, subcategories, type, setObj, choosedMainCategory, choosedSubCategory}) {

    const [isMainMenuClicked, setIsMainMenuClicked] = useState(false)

    useEffect(() => {
        if(choosedMainCategory === title)
            setIsMainMenuClicked(true);
    }, [])


  return (
      <>
        {type === 'default' && <div className='dropdown'>
            <div className="dropdown__title">{title}</div>
            <div className="dropdown__menu">
                <div className="subcategory__wrapper">
                    {
                        subcategories.map((val, idx) => {

                            return <div key={idx} className="subcategory__col">
                                <div className="subcategory__title">
                                    {val.title}
                                </div>
                                {
                                    val.items.map((itemName, itemIdx) => 
                                        <div 
                                            key={itemIdx} 
                                            className="subcategory__item" 
                                            onClick={() => {
                                                setObj({
                                                    mainCategory: title,
                                                    subCategory: itemName
                                                })
                                            }}>
                                                {itemName}
                                        </div> )       
                                }
                            
                            </div>

                        })
                    }
                    
                    
                </div>

            </div>
        </div> }

        {type === 'mobile' && <div className='dropdown-mobile'>
                <div className="dropdown-mobile__wrapper" onClick={() => setIsMainMenuClicked(!isMainMenuClicked)}>
                    <div className="dropdown-mobile__title">{title}</div>
                    {!isMainMenuClicked && <AiOutlinePlus size={20} /> }
                    {isMainMenuClicked && <AiOutlineMinus size={20} /> }
                </div>
                { isMainMenuClicked && <div className="subcategory-mobile__wrapper">
                    {
                        subcategories.map((val, idx) => {

                            return <Subcategory subcategory={val} key={idx} setObj={setObj} mainCategory={title} choosedMainCategory={choosedMainCategory} choosedSubCategory={choosedSubCategory}/>

                        })
                    }
                    
                    
                </div> }
            </div>}
        </>
  )
}

Dropdown.propsDefault = {
    type: 'default'
  }

export default Dropdown