import React from 'react'
import './Newsletter.styles.css'

function Newsletter() {
  return (
    <section className='newsletter'>
        <div className="blur">
            <div className="newsletter__desc-wrap">
                <h2 className="newsletter__title">Dołącz do nas!</h2>
                <p className="newsletter__desc">Jeśli chcesz otrzymywać wiadomości o najnowszych trendach oraz promocjach zapisz się już dziś!</p>
            </div>
            <div className="newsletter__form-wrap">
                <form action="" className='newsletter__form'>
                    <input type="email" name="newsletter_sign_in_input" id="newsletter_sign_in_input" className='newsletter__input' placeholder='przykładowyEmail@przykład.com'/>
                    <button type="submit" className='newsletter__button'>Dołącz</button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Newsletter