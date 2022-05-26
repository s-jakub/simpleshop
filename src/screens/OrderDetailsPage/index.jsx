import React, { useEffect } from 'react'

import Navbar from '../../containers/Navbar'
import Alert from '../../components/Alert'
import Loading from '../../components/Loading'
import { FaUser, FaTruck, FaMapMarkerAlt } from 'react-icons/fa'

import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../../store/slices/orderDetailsSlice'
import { setOrderPay } from '../../store/slices/orderPaySlice'

import moment from 'moment'
import 'moment/locale/pl'


const OrderDetailsPage = () => {

    const dispatch = useDispatch()
    const { id } = useParams()

    const { order, status, errorMsg} = useSelector(state => state.orderDetails)
    const  orderPay = useSelector(state => state.orderPay)
    
    useEffect(() => {
        dispatch(getOrderDetails(id))
    }, [dispatch, id, orderPay])
    
    const payHandle = () => {
        dispatch(setOrderPay(id))
    }

  return (
    <>
        <Navbar />
        {
            status === 'loading' ? <Loading /> :
            status === 'failed' ? <Alert type='warning' text={errorMsg} /> :

            <section className="order-container">
                <div className="order-info">
                    <div className="info">
                        <div className="info__image">
                            <FaUser size={30}/>
                        </div>
                        <div className="info__text">
                            <h3 className="info__text__title">Klient</h3>
                            <p className="info__text__desc">{order.user.name} {order.user.subname}</p>
                            <p className="info__text__desc">Nr telefonu: {order.deliveryAddress.phoneNumber}</p>
                            <p className="info__text__desc" style={{textTransform: 'none'}}><a style={{textDecoration: 'none', color: 'inherit'}} href={`mailto:${order.user.email}`}> {order.user.email} </a></p>
                        </div>
                    </div>
                    <div className="info">
                        <div className="info__image">
                            <FaTruck size={30}/>
                        </div>
                        <div className="info__text">
                            <h3 className="info__text__title">Informacja o zamówieniu</h3>
                            <p className="info__text__desc">Dostawa z: {order.deliveryAddress.country}</p>
                            <p className="info__text__desc">Metoda płatości: {order.paymentMethod}</p>
                            {
                                order.isPaid ? <p className="info__text__desc green">Zapłacono: {moment(order.paidAt).calendar()}</p> 
                                : <p className="info__text__desc red">Nie zapłacono</p>
                            }
                            
                        </div>
                    </div>
                    <div className="info">
                        <div className="info__image">
                            <FaMapMarkerAlt size={30}/>
                        </div>
                        <div className="info__text">
                            <h3 className="info__text__title">Dostawa do</h3>
                            <p className="info__text__desc">Adres: <span style={{textTransform: 'none'}}>ul.</span> {order.deliveryAddress.street}</p>
                            <p className="info__text__desc">{order.deliveryAddress.postCode}, {order.deliveryAddress.city}</p>
                            {
                                order.isDelivered ? <p className="info__text__desc green">Dostarczono: {moment(order.deliveredAt).calendar()}</p> 
                                : <p className="info__text__desc red">Nie dostarczono</p>
                            }
                        </div>
                    </div>
                
                </div>

                <div className="order-wrap">
                    <div className="order-items">
                        
                        {
                            order.orderItems.length === 0 ? <Alert text='Twój koszyk jest pusty' type='warning' /> 
                            :
                            order.orderItems.map(item => {
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
                                    <td>{order.orderItems.reduce((acc, next) => acc += next.price * next.quantity, 0).toFixed(2)} PLN</td>
                                </tr>
                                <tr>
                                    <th>Dostawa</th>
                                    <td>{ order.orderItems.length > 0 ? order.deliveryCost : '0.00'} PLN</td>
                                </tr>
                                <tr>
                                    <th>Łącznie</th>
                                    <td>{order.orderItems.length > 0 ? order.totalPrice : '0.00'} PLN</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        {
                            order.isPaid ? <Alert text="Zapacono za zakupy" /> :
                            <button className='order-summary__btn' onClick={() => payHandle()}>Zapłać</button>
                        }
                        

                    </div>
                </div>
            </section>
        }
    </>
  )
}

export default OrderDetailsPage