import React from 'react'
import search from '../assets/Search_Stroke.svg'
import SongCard from '../components/SongCard'


const Marketplace = () => {
  return (
    <div className='bg-white relative min-h-[100vh] w-[100vw]'>
      <div className='flex items-center justify-center w-[100vw] h-[25vh] bg-green'>
        <p className='text-[96px] mt-[-2rem] font-[Citizen-OT-Medium] font-[700] text-gray'>get your remix</p>
      </div>
      <div>
        <div className="mb-[45px] py-12 alivebottomborder bg-white flex items-center justify-center ">
          <div className="flex gap-[2.5rem] items-center">
            <img src={search.src} className="h-[3.5rem]" />
            <input
              style={{ fontFamily: "Nuform Sans" }}
              type="text"
              placeholder="search for an remix"
              className=" w-[45vw] px-[2rem] h-[54px] bg-white border border-gray text-gray text-[16px]"
            />
          </div>
        </div>
        <div className='w-[100vw] flex gap-[3rem] flex-wrap py-[5rem] px-[2rem] min-h-[100vh] bg-gray'>
          <SongCard />
          <SongCard />
          <SongCard />
          <SongCard />
          <SongCard />
          <SongCard />
          <SongCard />
        </div>
      </div>
    </div>
  )
}

export default Marketplace