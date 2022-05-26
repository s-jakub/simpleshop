import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import Navbar from '../../containers/Navbar'
import { saveDeliveryAddress } from '../../store/slices/cartSlice'
import './DeliveryAddress.styles.css'



const DeliveryAddress = () => {

  const navigate = useNavigate()
  
  const { userInfo } = useSelector(state => state.user)
  const { cartItems, deliveryAddress } = useSelector(state => state.cart)
  
  const [country, setCountry] = useState(deliveryAddress.country)
  const [city, setCity] = useState(deliveryAddress.city)
  const [street, setStreet] = useState(deliveryAddress.street)
  const [postCode, setPostCode] = useState(deliveryAddress.postCode)
  const [phoneNumber, setPhoneNumber] = useState(deliveryAddress.phoneNumber)

  const dispatch = useDispatch()

  useEffect(() => {
    if(!userInfo._id) {
      navigate('/login') 
    }

    if(userInfo._id && cartItems.length === 0)
      navigate('/cart')

  })

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveDeliveryAddress({country, city, street, postCode, phoneNumber}))
    navigate('/payment-method')
  }

  return (
    <>
      <Navbar />
      <section className="delivery-container">
        <div className="delivery-wrap">
          <h2 className='delivery-title'>Dane do dostawy</h2>
          <form action="" className="delivery-form" onSubmit={e => submitHandler(e)}>
            
            <Input type='text' name='delivery-country' placeholder='Kraj' inputValue={country} onChangeCallback={(e) => setCountry(e.target.value)}/>
            <Input type='text' name='delivery-city' placeholder='Miasto' inputValue={city} onChangeCallback={(e) => setCity(e.target.value)}/>
            <Input type='text' name='delivery-street' placeholder='Ulica' inputValue={street} onChangeCallback={(e) => setStreet(e.target.value)}/>
            <Input type='text' name='delivery-post-code' placeholder='Kod pocztowy' pattern='[0-9]{2}-[0-9]{3}' inputValue={postCode} onChangeCallback={(e) => setPostCode(e.target.value)}/>
            <Input type='text' name='delivery-phone-number' placeholder='Numer telefonu' pattern='[0-9]{9}' inputValue={phoneNumber} onChangeCallback={(e) => setPhoneNumber(e.target.value)}/>

            <button className="delivery-btn">Przejdź dalej</button>
          </form>

        </div>
      </section>
    </>
  )
}

export default DeliveryAddress