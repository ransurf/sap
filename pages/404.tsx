import Image from 'next/image'
import React from 'react'
import logo from '../assets/logo.png'
const Custom404 = () => {
  return (
    <div className='page-container items-center'>
        <Image width={200} height = {200} src={logo}></Image>
        <h1 className="page-title">404 page not found</h1>
    </div>
  )
}

export default Custom404