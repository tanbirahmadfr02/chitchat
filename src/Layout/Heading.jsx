/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const Heading = (props) => {
  return (
    <>
    {
        props.tag ? 
        <props.as className={props.className}>{props.text}</props.as>
        :
        <h2 className={props.className}>{props.text}</h2>
    }
    </>
  )
}

export default Heading