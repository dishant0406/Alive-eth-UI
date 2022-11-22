import React from 'react'
import CustomButton from '../components/CustomButton'
import SafariModal from '../packages/Modals/SelectModal';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const CrunkerComponent = dynamic(() => import('../packages/Modals/CrunkerComponent.jsx'), {
  ssr: false
})

import { useEffect } from 'react';
import ReactPlayer from 'react-player';

const songnames = [
  '/Songs/Song-Bass_(COMMERCIAL)_1.mp3',
  '/Songs/Song-Bass_(EXCLUSIVE)_1.mp3',
  '/Songs/Song-Bass_(PERSONAL)_1.mp3',
  '/Songs/Song-Bass_(PERSONAL_NOHATE)_1.mp3',
  '/Songs/Song-Bass_(PUBLIC_DOMAIN)_1.mp3',
  '/Songs/Song-Drums_(COMMERCIAL)_1.mp3',
  '/Songs/Song-Drums_(COMMERCIAL_NOHATE)_1.mp3',
  '/Songs/Song-Drums_(EXCLUSIVE)_1.mp3',
  '/Songs/Song-Drums_(PERSONAL)_1.mp3',
  '/Songs/Song-Drums_(PERSONAL_NOHATE)_1.mp3',
  '/Songs/Song-Drums_(PUBLIC_DOMAIN)_1.mp3',
  '/Songs/Song-Keys_(COMMERCIAL)_1.mp3',
  '/Songs/Song-Keys_(COMMERCIAL_NOHATE).mp3',
  '/Songs/Song-Keys_(COMMERCIAL_NOHATE)_2.mp3',
  '/Songs/Song-Keys_(EXCLUSIVE)_1.mp3',
  '/Songs/Song-Keys_(PERSONAL)_1.mp3',
  '/Songs/Song-Keys_(PERSONAL_NOHATE)_1.mp3',
  '/Songs/Song-Keys_(PUBLIC_DOMAIN)_1.mp3',
  '/Songs/Song-Vocals_(COMMERCIAL)_1.mp3',
  '/Songs/Song-Vocals_(COMMERCIAL_NOHATE)_1.mp3',
  '/Songs/Song-Vocals_(EXCLUSIVE)_1.mp3',
  '/Songs/Song-Vocals_(PERSONAL)_1.mp3',
  '/Songs/Song-Vocals_(PERSONAL_NOHATE)_1.mp3',
  '/Songs/Song-Vocals_(PUBLIC_DOMAIN)_1.mp3'
]

const Home = () => {
  const [open, setOpen] = useState(false);
  const [blob, setBlob] = useState(null)
  const [items, setItems] = useState({
    vocal: [{ name: 'COMMERCIAL', path: '/Songs/Song-Vocals_(COMMERCIAL)_1.mp3' }, { name: 'COMMERCIAL_NOHATE', path: '/Songs/Song-Vocals_(COMMERCIAL_NOHATE)_1.mp3' }, { name: 'EXCLUSIVE', path: '/Songs/Song-Keys_(EXCLUSIVE)_1.mp3' }, { name: 'PERSONAL', path: '/Songs/Song-Vocals_(PERSONAL)_1.mp3' }, { name: 'PERSONAL_NOHATE', path: '/Songs/Song-Vocals_(PERSONAL_NOHATE)_1.mp3' }, { name: 'PUBLIC_DOMAIN', path: '/Songs/Song-Vocals_(PUBLIC_DOMAIN)_1.mp3' }],
    guitar: [{ name: 'COMMERCIAL', path: '/Songs/Song-Keys_(COMMERCIAL)_1.mp3' }, { name: 'COMMERCIAL_NOHATE2', path: '/Songs/Song-Keys_(COMMERCIAL_NOHATE)_2.mp3' }, { name: 'COMMERCIAL_NOHATE', path: '/Songs/Song-Keys_(COMMERCIAL_NOHATE).mp3' }, { name: 'EXCLUSIVE', path: '/Songs/Song-Keys_(EXCLUSIVE)_1.mp3' }, { name: 'PERSONAL', path: '/Songs/Song-Keys_(PERSONAL)_1.mp3' }, { name: 'PERSONAL_NOHATE', path: '/Songs/Song-Keys_(PERSONAL_NOHATE)_1.mp3' }, { name: 'PUBLIC_DOMAIN', path: '/Songs/Song-Keys_(PUBLIC_DOMAIN)_1.mp3' }],
    bass: [{ name: 'COMMERCIAL', path: '/Songs/Song-Bass_(COMMERCIAL)_1.mp3' }, { name: 'EXCLUSIVE', path: '/Songs/Song-Bass_(EXCLUSIVE)_1.mp3' }, { name: 'PERSONAL', path: '/Songs/Song-Bass_(PERSONAL)_1.mp3' }, { name: 'PERSONAL_NOHATE', path: '/Songs/Song-Bass_(PERSONAL_NOHATE)_1.mp3' }, { name: 'PUBLIC_DOMAIN', path: '/Songs/Song-Bass_(PUBLIC_DOMAIN)_1.mp3' }],
    drum: [{ name: 'COMMERCIAL', path: '/Songs/Song-Drums_(COMMERCIAL)_1.mp3' }, { name: 'COMMERCIAL_NOHATE', path: '/Songs/Song-Drums_(COMMERCIAL_NOHATE)_1.mp3' }, { name: 'EXCLUSIVE', path: '/Songs/Song-Drums_(EXCLUSIVE)_1.mp3' }, { name: 'PERSONAL', path: '/Songs/Song-Drums_(PERSONAL)_1.mp3' }, { name: 'PERSONAL_NOHATE', path: '/Songs/Song-Drums_(PERSONAL_NOHATE)_1.mp3' }, { name: 'PUBLIC_DOMAIN', path: '/Songs/Song-Vocals_(PUBLIC_DOMAIN)_1.mp3' }],
  })
  const [values, setValues] = useState({
    vocal: ['', ''],
    guitar: ['', ''],
    bass: ['', ''],
    drum: ['', '']
  })
  const [pathArr, setPathArr] = useState([])


  const [selectedOption, setSelectedOption] = useState('vocal')

  return (
    <div className='bg-white relative h-[100vh] w-[100vw]'>
      <CrunkerComponent pathArr={pathArr} setBlob={setBlob} setPathArr={setPathArr} values={values} />
      <div className='flex justify-center pt-[2rem] gap-[4rem]'>
        <CustomButton onClick={() => { setSelectedOption('vocal'); setOpen(true) }} text={'Vocal'} />
        <CustomButton onClick={() => { setSelectedOption('guitar'); setOpen(true) }} text={'Guitar'} />
        <CustomButton onClick={() => { setSelectedOption('bass'); setOpen(true) }} text={'Bass'} />
        <CustomButton onClick={() => { setSelectedOption('drum'); setOpen(true) }} text={'Drum'} />
      </div>
      <div className='mt-[6rem] flex flex-col gap-[2rem] items-center w-[100vw]'>
        <div className='w-[40rem] flex gap-[2rem] flex-col items-end'>
          <div className='flex gap-[1rem] items-center'>
            <div className='font-[Citizen-OT-Medium] text-[26px] text-gray font-[700]'>Vocal</div>
            <div className='h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[30rem] flex items-center'>{values.vocal[0]}</div>
          </div>
          <div className='flex gap-[1rem] items-center'>
            <div className='font-[Citizen-OT-Medium] text-[26px] text-gray font-[700]'>Guitar</div>
            <div className='h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[30rem] flex items-center'>{values.guitar[0]}</div>
          </div>
          <div className='flex gap-[1rem] items-center'>
            <div className='font-[Citizen-OT-Medium] text-[26px] text-gray font-[700]'>Bass</div>
            <div className='h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[30rem] flex items-center'>{values.bass[0]}</div>
          </div>
          <div className='flex gap-[1rem] items-center'>
            <div className='font-[Citizen-OT-Medium] text-[26px] text-gray font-[700]'>Drum</div>
            <div className='h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[30rem] flex items-center'>{values.drum[0]}</div>
          </div>
        </div>
      </div>
      <div className='w-[100vw] flex justify-center mt-[2rem]'>
        <button className='font-[Citizen-OT-Medium] flex items-center justify-center h-[4rem] w-[10rem] bg-yellow border border-gray text-[26px] text-gray font-[700]'>next</button>
      </div>
      {blob !== null && <ReactPlayer loop={true} url={blob} playing />}
      <SafariModal values={values} setValues={setValues} selectedOption={selectedOption} items={items[selectedOption]} open={open} setOpen={setOpen} />
    </div>
  )
}

export default Home