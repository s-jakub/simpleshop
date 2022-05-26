import React, { useEffect } from 'react'
import './CartPage.styles.css'

import Navbar from '../../containers/Navbar'

import { useNavigate, useParams, useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../store/slices/cartSlice'
import Alert from '../../components/Alert'

const CartPage = () => {

    const navigate = useNavigate();
    const location = useLocation()
    const qty = Number(location.search.split('=')[1])
    const { id } = useParams();

    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.user)
    
    const summary = cartItems.reduce((prev, val) => prev + val.quantity * val.price, 0).toFixed(2)
    
    useEffect(() => {
        if(id && qty) {
            dispatch(addToCart({productId: id, qty}))
        }
 
    }, [dispatch, id, qty])
    
    const removeItemFromCardHandler = (itemToDel) => {
        dispatch(removeFromCart(itemToDel))
    }

  return <>
        <Navbar />
        {
            cartItems.length === 0 ? <Alert type={'info'} text='Twój koszyk jest pusty :(' /> :
            <section className="container">
                <p className="ammount-products-info">
                    Łączna ilość produktów w koszyku ( {cartItems.length} ) 
                </p>

                <div className="cart-container">
                    {
                        cartItems.map(item => {
                            return <div className="cart-item" key={item.product}>
                                <button className="del-from-cart-btn" onClick={() => removeItemFromCardHandler(item)}>X</button>
                                <div className="cart-item__image" style={{backgroundImage: `url(${item.image})`}}></div>
                                <div className="cart-item__title">
                                    <Link to={`/product/${item.product}`} className='text-link'>
                                        {item.name}
                                    </Link>
                                </div>
                                <div className="cart-item__wrap">
                                    <div className="cart-item__quantity">
                                        <div className="cart-item__quantity__title">Ilość</div>
                                        <div className="cart-item__quantity__wrap">
                                            <input 
                                                type="number" 
                                                name="quantity" 
                                                id="quantity"
                                                value={item.quantity}
                                                min={1} 
                                                max={item.countInStock} 
                                                onChange={e => {
                                                    let validate = 1
                                                    Number(e.target.value) <= 0 ? validate = 1 : 
                                                    Number(e.target.value) > item.countInStock ? validate = item.countInStock :  validate = Number(e.target.value) 
                                                    
                                                    dispatch(addToCart({productId: item.product, qty: validate}))
                                                }}

                                            /> 
                                            <span className='slash'>/</span>
                                            {item.countInStock}
                                        </div>
                                    </div>
                                    <div className="cart-item__subtotal">
                                        <div className="cart-item__subtotal__title">Cena produktu</div>
                                        <div className="cart-item__subtotal__price">{item.price} PLN</div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>

                <div className="summary">
                    <div className="summary__title">Do zapłaty: </div>
                    <div className="summary__price">{summary} PLN</div>
                </div> 

                <div className="btns">
                    <button className="button-style continue-shopping" onClick={() => navigate('/')}>Kontynuuj zakupy</button>
                    <button className="button-style checkout" onClick={() => userInfo._id ? navigate('/delivery') : navigate('/login') }>Zapłać</button>
                </div>
            </section>
        }
    </>
}

export default CartPage