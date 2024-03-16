/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const Input = ({type, placeholder, className, onChange, name}) => {
  return (
    <>
    <input type={type} name={name} placeholder={placeholder} className={className} onChange={onChange}/>
    </>
  )
}

export default Input