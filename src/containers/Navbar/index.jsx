import React, { useEffect, useRef, useState } from 'react'
import './Navbar.styles.css'

import { useMediaQuery } from 'react-responsive'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { manSubcategory, womanSubcategory, kidSubcategory } from '../../components/Dropdown/subcategories'

import Dropdown from '../../components/Dropdown/Dropdown'
import { BiSearch, BiShoppingBag } from 'react-icons/bi';
import { MdPersonOutline } from 'react-icons/md';



function Navbar() {

    const searchRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()
    const isSmallDevice = useMediaQuery({query: '(max-width: 910px)'})

    const [isMenuActive, setIsMenuActive] = useState(false)
    const [isSearchActive, setIsSearchActive] = useState(false)

    const [keyword, setKeyword] = useState()
    const [categoryObj, setCategoryObj] = useState({})

    const { cartItems } = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.user)

    useEffect(() => {
        if(categoryObj.mainCategory && categoryObj.subCategory)
            navigate(`/category/${categoryObj.mainCategory}/${categoryObj.subCategory}`)
        else 
            navigate(`${location.pathname}`)

    }, [categoryObj, navigate, location.pathname])

    const handleSearch = () => {
        if(keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }
  return (
    <header className='header'>
        <Link to='/' className='text-link'>
            <h1 className='header__title'>SimpleShop</h1>
        </Link>
        { !isSmallDevice && <>
            <nav className='header__category'>
                <Dropdown title='Mężczyzna' subcategories={manSubcategory} type='default' setObj={setCategoryObj}/>
                <Dropdown title='Kobieta' subcategories={womanSubcategory} type='default' setObj={setCategoryObj}/>
                <Dropdown title='Dziecko' subcategories={kidSubcategory} type='default' setObj={setCategoryObj}/>
            </nav>
            <div className='header__items-wrapper'>

                <div className='item-container search-btn-container'>
                    <BiSearch size='20px' />
                    <input className='search-btn-input' type='text' placeholder='Szukaj' onFocus={() => setIsSearchActive(true)}  />
                </div>

                { isSearchActive && <div className='search-container'>
                        <div className="close-search" onClick={() => setIsSearchActive(false)}>X</div>
                        <h3>Wyszukaj przedmiotu</h3>
                        <div className="search-items-wrap">
                            <div>
                                <BiSearch size='30px'/>
                                <input className='search-btn-input' type='text' placeholder='Szukaj' onChange={e => setKeyword(e.target.value)} style={{width: 'calc(100% - 30px)'}} autoFocus/>
                                
                            </div>
                            <button onClick={handleSearch}>Wyszukaj</button>
                        </div>
                    </div>}
                
                <Link to={`${userInfo._id ? '/profile' : '/login' }`} className='text-link' >
                    <div className='item-container'>
                        <MdPersonOutline size={30} />
                        <div className="item-container__title">{userInfo.name ? userInfo.name : 'Konto'}</div>
                    </div>
                </Link>

                <Link to='/cart' className='text-link' >
                    <div className='item-container'>
                        <div className="count-cart-items">{cartItems.length}</div>
                        <BiShoppingBag size={30} />
                        <div className="item-container__title">Koszyk</div>
                    </div>
                </Link>
            </div>
        </> }

        { isSmallDevice && <>
            { !isMenuActive && <div className="hamburger-menu" onClick={() => {
                setIsMenuActive(true)
                window.document.body.style.overflow = "hidden";
                }}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div> }

            { isSearchActive && <div className='search-container'>
                <div className="close-search" onClick={() => setIsSearchActive(false)}>X</div>
                <h3>Wyszukaj przedmiotu</h3>
                <div className="search-items-wrap">
                    <div>
                        <BiSearch size='30px'/>
                        <input 
                            className='search-btn-input' 
                            type='text' 
                            placeholder='Szukaj' 
                            style={{width: 'calc(100% - 30px)'}} 
                            ref={searchRef}
                            autoFocus
                            onChange={e => setKeyword(e.target.value)}
                            />
                    </div>
                    <button onClick={handleSearch}>Wyszukaj</button>
                </div>
            </div>}

            { isMenuActive && <div className="hamburger-menu" onClick={() => {
                setIsMenuActive(false)
                window.document.body.style.overflow = "auto";
                }}>
                <div className="cross1 line"></div>
                <div className="cross2 line"></div>
            </div> }

            { isMenuActive && <div className='header-container'>
                <div className='header__items-wrapper'>

                    <div className='item-container search-btn-container'>
                        <BiSearch size='20px'/>
                        <input 
                            className='search-btn-input' 
                            type='text' 
                            placeholder='Szukaj' 
                            onClick={() => {
                                setIsMenuActive(false)
                                setIsSearchActive(true)
                                window.document.body.style.overflow = "auto";
                            }} 
                            ref={searchRef} />
                    </div>

                    <div className='item-container' onClick={() => {
                        navigate(`${userInfo._id ? '/profile' : '/login' }`)
                        window.document.body.style.overflow = "auto";
                        setIsMenuActive(false)
                    }}>
                        <MdPersonOutline size={30} />
                        <div className="item-container__title">{userInfo.name ? userInfo.name : 'Konto'}</div>
                    </div>

                    <div className='item-container' onClick={() => {
                        navigate('/cart')
                        window.document.body.style.overflow = "auto";
                        setIsMenuActive(false);    
                    }}>
                        <div className="count-cart-items">{cartItems.length}</div>
                        <BiShoppingBag size={30} />
                        <div className="item-container__title">Koszyk</div>
                    </div>
                </div>

                <nav className='header__category'>
                    <Dropdown title='Mężczyzna' subcategories={manSubcategory} type='mobile' setObj={setCategoryObj} />
                    <Dropdown title='Kobieta' subcategories={womanSubcategory} type='mobile' setObj={setCategoryObj}/>
                    <Dropdown title='Dziecko' subcategories={kidSubcategory} type='mobile' setObj={setCategoryObj}/>
                </nav>
            </div>}

        </> } 
    </header>
  )
}

export default Navbar