import React, { useEffect, useRef, useState } from 'react'
import './ProfilePage.styles.css'

import Navbar from '../../containers/Navbar'
import Input from '../../components/Input'
import Loading from '../../components/Loading'
import Alert from '../../components/Alert'

import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';


import moment from 'moment'
import 'moment/locale/pl'
import { useDispatch, useSelector } from 'react-redux'
import { logout, updateProfile } from '../../store/slices/userSlice'
import { getUserOrdersList } from '../../store/slices/userOrdersSlice'


const ProfilePage = () => {
    
    const dispatch = useDispatch()
    const { userInfo, status } = useSelector(state => state.user)
    const userOrders = useSelector(state => state.userOrders)

    const [isProfileSettingActive, setIsProfileSettingActive] = useState(true)
    const [isOrderListActive, setIsOrderListActive] = useState(false)
    const [isPopUpActive, setIsPopUpActive] = useState(false)

    const [name, setName] = useState("")
    const [subname, setSubname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const toastId = useRef(null)



    useEffect(() => {
        if(userInfo) {
            setName(userInfo.name)
            setSubname(userInfo.subname)
            setEmail(userInfo.email)
        } 

    }, [userInfo])

    useEffect(() => {
        if(!toast.isActive(toastId.current) && status === 'failed')
            toastId.current = toast.error('Nie udało się zaktualizować profilu')
    })

    useEffect(() => {
        dispatch(getUserOrdersList())   
    }, [dispatch])

    const updateUserInfoHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            if(!toast.isActive(toastId.current))
                toastId.current = toast.error('Podane hasła są różne')
        }
        else {
            dispatch(updateProfile({id: userInfo._id, name, subname, email, password}))
            if(!toast.isActive(toastId.current) && status === 'success')
            toastId.current = toast.success('Profil zaktualizowany pomyślnie')
        }
    }

    const logoutHandler = () => {
        dispatch(logout())
    }

  return (
      <>
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        <Navbar />
        <section className="profile-container">
            <div className="profile-info">
                <div className="profile-info__baner"></div>
                <div className="profile-info__desc">
                    <div className="profile-info__image-container">
                        <div className="profile-info__img-wrap">
                            <div className="desc__image">
                                <FaUser size={80} />
                            </div>
                        </div>
                    </div>
                    <div className="desc__text-wrap">
                        <p className="username">{userInfo.name}</p>
                        <p className="join-date">Dołaczył/a {moment(userInfo.createdAt).format('LL')}</p>
                    </div>
                </div>
                <div className="profile-info__btns">
                    <button className={`profile-btn ${isProfileSettingActive ? 'active_btn' : '' }`}
                        onClick={() => {
                            setIsProfileSettingActive(true)
                            setIsOrderListActive(false)
                        }}>Ustawienia profilu</button>
                    <button className={`profile-btn order-list ${isOrderListActive ? 'active_btn' : '' }`}
                        onClick={() => {
                            setIsProfileSettingActive(false)
                            setIsOrderListActive(true)
                        }}>
                        <div>Lista zamówień</div>
                        <div className='order-list__quantity'>{userOrders.orders ? userOrders.orders.length : 0}</div>
                    </button>
                    <button className='profile-btn' onClick={() => setIsPopUpActive(true)}>
                        wyloguj się
                    </button>
                </div>
                {isPopUpActive && <div className='popup'>
                    <div className="popup__logout">
                        <h3>Czy napewno chcesz się wylogować?</h3>
                        <div className="popup__logout__btns">
                            <button className='logout-btn no-btn' onClick={() => setIsPopUpActive(false)}>NIE</button>
                            <button className='logout-btn' onClick={logoutHandler}>TAK</button>
                        </div>
                    </div>
                
                </div>}
            </div>
            <div className="profile-wrapper">
                
                {status === 'loading' && <Loading /> }
                
                {isProfileSettingActive && <form action="" className="form-update-profile" onSubmit={e => updateUserInfoHandler(e)}>
                    <div className="form-update-profile__row">
                        <Input type='text' name='profile-update-name' placeholder='Imię' lineColor='#91e3f1' fontColor='#91e3f1' inputValue={name} onChangeCallback={e => setName(e.target.value)}/>
                        <Input type='text' name='profile-update-subname' placeholder='Nazwisko' lineColor='#91a7f1' fontColor='#91a7f1' inputValue={subname} onChangeCallback={e => setSubname(e.target.value)}/>
                    </div>
                    <div className="from-update-profile__row">
                        <Input type='email' name='profile-update-email' placeholder='Email' inputValue={email} onChangeCallback={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-update-profile__row">
                        <Input type='password' name='profile-update-new-password'  placeholder='Nowe hasło' lineColor='#91a7f1' fontColor='#91a7f1' inputValue={password} onChangeCallback={e => setPassword(e.target.value)}/>
                        <Input type='password' name='profile-update-current-password' placeholder='Potwierdź hasło' lineColor='#91e3f1' fontColor='#91e3f1' inputValue={confirmPassword} onChangeCallback={e => setConfirmPassword(e.target.value)}/>
                    </div>

                    <button type="submit" className='form-update-profile__submit'>Zmień ustawienia profilu</button>
                </form> }
                
                {isOrderListActive && <div className="table-wrap">
                    {
                        userOrders.status === 'loading' ? <Loading /> :
                        userOrders.status === 'failed' ? <Alert type='warning' text={userOrders.errorMsg} /> :
                        userOrders.orders.length === 0 ? <Alert type='info' text='Jeszcze nic nie zamówiłeś' /> :
                        <table className="order-table">
                            <thead>
                                <tr>
                                    <th>ID zamówienia</th>
                                    <th>Status</th>
                                    <th>data</th>
                                    <th>Łącznie do zapłatay</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userOrders.orders.map(order => {
                                        return (
                                            <tr key={order._id} className={order.isPaid ? "paid" : "not-paid"}>
                                                <th>
                                                    <a href={`/order-details/${order._id}`}>{order._id}</a>    
                                                </th>
                                                <th>{order.isPaid ? "Zapłacono" : "Nie zapłacono"}</th>
                                                <th>{order.isPaid ? moment(order.paidAt).calendar() : moment(order.createdAt).calendar() }</th>
                                                <th>{order.totalPrice} PLN</th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    }

                </div> }
            </div>
        </section>
      </>
  )
}

export default ProfilePage