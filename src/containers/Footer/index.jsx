import React from 'react'
import './Footer.styles.css'

import ContactCard from '../../components/ContactCard'

import { BiPhoneCall } from 'react-icons/bi'
import { MdOutlineLocationOn } from 'react-icons/md'
import { AiOutlineMail } from 'react-icons/ai'
import { BsFacebook, BsInstagram, BsPinterest } from 'react-icons/bs'


function Footer() {
  return (
    <footer className='footer'>
        <div className="contact">
            <ContactCard title='Zadzwoń do nas' description='111-111-111'> 
                <BiPhoneCall size={50} />
            </ContactCard>
            <ContactCard title='Główna Siedziba' description='Lublin ul. Słowackiego 25'> 
                <MdOutlineLocationOn size={50} />
            </ContactCard>
            <ContactCard title='Email' description='kontakt@simplyshop.com'> 
                <AiOutlineMail size={50} />
            </ContactCard>
        </div>
        <div className="social-media">
            <a href='https://www.facebook.com' className="element-wrap" target='_blank' rel='noreferrer'>
                <BsFacebook />
                <div className="social-media__title">facebook</div>
            </a>
            <a href='https://www.instagram.com' className="element-wrap" target='_blank' rel='noreferrer'>
                <BsInstagram />
                <div className="social-media__title">instagram</div>
            </a>
            <a href='https://www.pinterest.com' className="element-wrap" target='_blank' rel='noreferrer'>
                <BsPinterest />
                <div className="social-media__title">pinterest</div>
            </a>
            
        </div>
    </footer>
  )
}

export default Footer