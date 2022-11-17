import React, { useState } from 'react'

const CustomButton = ({text, onClick=()=>{}}) => {
  return (
    <button onClick={onClick} className='relative flex w-[9rem] justify-center items-center h-[5rem] bg-gray'>
      <div className='absolute top-[0] librarycardafter1holder right-[-10px]'></div>
      <div className='absolute left-[0] librarycardafter2holder bottom-[-10px]'></div>
      <p className='font-[Citizen-OT-Medium] text-[26px] text-white font-[700]'>{text}</p>
    </button>
  )
}

export default CustomButton