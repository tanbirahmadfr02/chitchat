/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const Image = ({src, alt, className}) => {
  return (
    <>
    <img className={className} src={src} alt={alt} />
    </>
  )
}

export default Image