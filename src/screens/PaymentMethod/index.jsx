import React, { useEffect, useState } from 'react'
import './PaymentMethod.styles.css'

import Navbar from '../../containers/Navbar'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../../store/slices/cartSlice'

const PaymentMethod = () => {

    const navigate = useNavigate()
    
    const [paymentMethod, setPaymentMethod] = useState("paypal");
    
    const { deliveryAddress } = useSelector(state => state.cart)

    const dispatch = useDispatch()

    useEffect(() => {
        if(!deliveryAddress.postCode) 
            navigate('/delivery')
    })

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod({paymentMethod}))
        navigate('/order')
    }

  return (
      <>
        <Navbar />
        <section className='delivery-container'>
            <div className="delivery-wrap">
                <h2 className="delivery-title">Wybierz metodę płatności</h2>
                <form action="" className="delivery-form" style={{ alignItems: 'center'}} onSubmit={(e) => submitHandler(e)}>

                    <div className="radio-wrap">
                        <div className="radio-item">
                            <input type="radio" name="payment-method" id="paypal" value="paypal" checked onChange={e => setPaymentMethod(e.target.value)}/>
                            <label htmlFor="paypal">PAYPAL</label>
                        </div>

                        <div className="radio-item">
                            <input type="radio" name="payment-method" id="other" value="other" onChange={e => setPaymentMethod(e.target.value)}/>
                            <label htmlFor="other">INNA</label>
                        </div>
                    </div>

                    <button type="submit" className="delivery-btn">Przejdź dalej</button>
                </form>
            </div>
        </section>
        </>
  )
}

export default PaymentMethod