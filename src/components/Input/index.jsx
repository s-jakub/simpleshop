import React, { useEffect, useState } from 'react'
import './Input.styles.css'


const Input = ({type, name, placeholder, fontColor, lineColor, pattern, inputValue ,onChangeCallback }) => {

    const [value, setValue] = useState('');
    const [labelStyle, setLabelStyle] = useState('label-default')

    useEffect(() => {
      if(value || inputValue) 
        setLabelStyle('label-up')
      else
       setLabelStyle('label-default')
    }, [value, inputValue])

  return (
    <div className="wrap-for-input">
        <input 
            type={type} 
            name={name} 
            id={name} 
            required
            autoComplete={name}
            pattern={pattern}
            className='input-default' 
            value={value || inputValue}
            style={{ borderBottom: `2px solid ${lineColor}`}}
            onChange={(e) => {
              onChangeCallback(e)
              setValue(e.target.value) 
            }} 
            onBlur={() => value || inputValue ? setLabelStyle('label-up') : setLabelStyle('label-default')}/>
        <label 
            htmlFor={name} 
            className={`${labelStyle}`}
            style={{ top: `${value || inputValue ? '-12px' : ''}`, color: fontColor }}
            >
                {placeholder}
        </label>
    </div>
  )
}

Input.propsDefault = {
  bgColor: 'inherit',
  activeFontColor: '#d1d1d1',
  fontColor: '#000',
  lineColor: '#d1d1d1',
  type: 'text',
  placeholder: 'test',
  name: 'test',
}

export default Input