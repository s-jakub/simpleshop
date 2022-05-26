import React, { useEffect } from 'react'
import './OrderPage.styles.css'

import Navbar from '../../containers/Navbar'
import Alert from '../../components/Alert'
import { FaUser, FaTruck, FaMapMarkerAlt } from 'react-icons/fa'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../../store/slices/orderSlice'

const OrderPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cartItems, deliveryAddress, paymentMethod, ...cart } = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.user)

    cart.itemsPrice = cartItems.reduce((acc, next) => acc += next.price * next.quantity, 0).toFixed(2)
    cart.deliveryCost = (Math.random() * (20 - 4) + 5).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.deliveryCost)).toFixed(2)

    const { order, status, errorMsg } = useSelector(state => state.order)

    useEffect(() => {
        if(status === 'success')
            navigate(`/order-details/${order._id}`)
    }, [navigate, status, order])

    const createOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            deliveryAddress,
            paymentMethod,
            itemsPrice: cart.itemsPrice,
            deliveryCost: cart.deliveryCost,
            totalPrice: cart.totalPrice,
        }))
    }

  return (
    <>
        <Navbar />
        <section className="order-container">
            <div className="order-info">
                <div className="info">
                    <div className="info__image">
                        <FaUser size={30}/>
                    </div>
                    <div className="info__text">
                        <h3 className="info__text__title">Klient</h3>
                        <p className="info__text__desc">{userInfo.name} {userInfo.subname}</p>
                        <p className="info__text__desc">Nr telefonu: {deliveryAddress.phoneNumber}</p>
                        <p className="info__text__desc" style={{textTransform: 'none'}}>{userInfo.email}</p>
                    </div>
                </div>
                <div className="info">
                    <div className="info__image">
                        <FaTruck size={30}/>
                    </div>
                    <div className="info__text">
                        <h3 className="info__text__title">Informacja o zamówieniu</h3>
                        <p className="info__text__desc">Dostawa z: {deliveryAddress.country}</p>
                        <p className="info__text__desc">Metoda płatości: {paymentMethod}</p>
                        {/* <p className="info__text__desc red">Nie zapłacono</p> */}
                    </div>
                </div>
                <div className="info">
                    <div className="info__image">
                        <FaMapMarkerAlt size={30}/>
                    </div>
                    <div className="info__text">
                        <h3 className="info__text__title">Dostawa do</h3>
                        <p className="info__text__desc">Adres: <span style={{textTransform: 'none'}}>ul.</span> {deliveryAddress.street}</p>
                        <p className="info__text__desc">{deliveryAddress.postCode}, {deliveryAddress.city}</p>
                        {/* <p className="info__text__desc red">Nie dostarczono</p> */}
                    </div>
                </div>
               
            </div>

            <div className="order-wrap">
                <div className="order-items">
                    
                    {
                        cartItems.length === 0 ? <Alert text='Two koszyk jest pusty' type='warning' /> 
                        :
                        cartItems.map(item => {
                            return <div key={item.product} className="cart-item" style={{ borderBottom: '1px solid #eee', padding: '0.5rem 2rem', boxShadow: 'none', margin: 0}}>
                                    <div className="cart-item__image" style={{width: '100px', height: '100px', backgroundImage: `url(${item.image})`}}></div>
                                    <div className="cart-item__title">
                                        <Link to={`/product/${item.product}`} className="text-link">
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div className="cart-item__wrap">
                                        <div className="cart-item__quantity">
                                            <div className="cart-item__quantity__title">Ilość</div>
                                            <div className="cart-item__quantity__wrap" style={{textAlign: 'center'}}>
                                                {item.quantity}
                                            </div>
                                        </div>
                                        <div className="cart-item__subtotal">
                                            <div className="cart-item__subtotal__title">Cena produktów</div>
                                            <div className="cart-item__subtotal__price">{item.price * item.quantity } PLN</div>
                                        </div>
                                    </div>
                                </div>
                        })
                    }

                  

                </div>
                <div className="order-summary">
                    <table className='table-summary'>
                        <tbody>
                            <tr>
                                <th>Produkty</th>
                                <td>{cart.itemsPrice} PLN</td>
                            </tr>
                            <tr>
                                <th>Dostawa</th>
                                <td>{ cartItems.length > 0 ? cart.deliveryCost : '0.00'} PLN</td>
                            </tr>
                            <tr>
                                <th>Łącznie</th>
                                <td>{cartItems.length > 0 ? cart.totalPrice : '0.00'} PLN</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    {cartItems.length === 0 ? null 
                        : 
                        <button className='order-summary__btn' onClick={() => createOrderHandler() }>Zamów</button>
                    }

                    {errorMsg && <Alert type='warning' text={errorMsg} />}
                </div>
            </div>
        </section>
    </>
  )
}

export default OrderPage