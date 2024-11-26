import NavBar from '@/components/navbar'
import Image from 'next/image'
import React from 'react'

function MainContainer({ children, active }) {
  return (
    <div className='max-w-[600px] w-[100%] mx-auto bg-gray-50 h-screen flex flex-col justify-between'>
      <h1 height={40} width={100} className='py-3 mx-auto' >寮食なび</h1>
      <div className='overflow-y-auto h-full justify-start flex flex-col'>
        { children }
      </div>
      <NavBar active={active}/>
    </div>
  )
}

export default MainContainer
