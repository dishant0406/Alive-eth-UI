import React from 'react'
import CustomButton from '../components/CustomButton'
import SafariModal from '../packages/Modals/SelectModal';
import cd from '/assets/Main/Images/CD.svg'
import { useState } from 'react';
import dynamic from 'next/dynamic';
import nft_license from '/assets/Main/Images/nft_license.png'
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const CrunkerComponent = dynamic(() => import('../packages/Modals/CrunkerComponent.jsx'), {
  ssr: false
})

import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import Link from 'next/link';

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
  const [duration, setDuration] = useState('')
  const [progress, setProgress] = useState('')
  const router = useRouter()

  const redirectToMint = () => {
    if ((values.vocal[0] === 'COMMERCIAL_NOHATE' || values.vocal[0] === 'COMMERCIAL') && (values.bass[0] === 'COMMERCIAL_NOHATE' || values.bass[0] === 'COMMERCIAL') && (values.keys[0] === 'COMMERCIAL_NOHATE' || values.keys[0] === 'COMMERCIAL') && (values.drum[0] === 'COMMERCIAL_NOHATE' || values.drum[0] === 'COMMERCIAL')) {
      router.push('/mint');
    } else {
      toast.error('Cant mint remix without "COMMERCIAL_NOHATE" or "COMMERCIAL" !');
    }
  }

  const [items, setItems] = useState({
    vocal: [{ name: 'COMMERCIAL', path: '/Songs/Song-Vocals_(COMMERCIAL)_1.mp3' }, { name: 'COMMERCIAL_NOHATE', path: '/Songs/Song-Vocals_(COMMERCIAL_NOHATE)_1.mp3' }, { name: 'EXCLUSIVE', path: '/Songs/Song-Keys_(EXCLUSIVE)_1.mp3' }, { name: 'PERSONAL', path: '/Songs/Song-Vocals_(PERSONAL)_1.mp3' }, { name: 'PERSONAL_NOHATE', path: '/Songs/Song-Vocals_(PERSONAL_NOHATE)_1.mp3' }, { name: 'PUBLIC_DOMAIN', path: '/Songs/Song-Vocals_(PUBLIC_DOMAIN)_1.mp3' }],
    keys: [{ name: 'COMMERCIAL', path: '/Songs/Song-Keys_(COMMERCIAL)_1.mp3' }, { name: 'COMMERCIAL_NOHATE2', path: '/Songs/Song-Keys_(COMMERCIAL_NOHATE)_2.mp3' }, { name: 'COMMERCIAL_NOHATE', path: '/Songs/Song-Keys_(COMMERCIAL_NOHATE).mp3' }, { name: 'EXCLUSIVE', path: '/Songs/Song-Keys_(EXCLUSIVE)_1.mp3' }, { name: 'PERSONAL', path: '/Songs/Song-Keys_(PERSONAL)_1.mp3' }, { name: 'PERSONAL_NOHATE', path: '/Songs/Song-Keys_(PERSONAL_NOHATE)_1.mp3' }, { name: 'PUBLIC_DOMAIN', path: '/Songs/Song-Keys_(PUBLIC_DOMAIN)_1.mp3' }],
    bass: [{ name: 'COMMERCIAL', path: '/Songs/Song-Bass_(COMMERCIAL)_1.mp3' }, { name: 'EXCLUSIVE', path: '/Songs/Song-Bass_(EXCLUSIVE)_1.mp3' }, { name: 'PERSONAL', path: '/Songs/Song-Bass_(PERSONAL)_1.mp3' }, { name: 'PERSONAL_NOHATE', path: '/Songs/Song-Bass_(PERSONAL_NOHATE)_1.mp3' }, { name: 'PUBLIC_DOMAIN', path: '/Songs/Song-Bass_(PUBLIC_DOMAIN)_1.mp3' }],
    drum: [{ name: 'COMMERCIAL', path: '/Songs/Song-Drums_(COMMERCIAL)_1.mp3' }, { name: 'COMMERCIAL_NOHATE', path: '/Songs/Song-Drums_(COMMERCIAL_NOHATE)_1.mp3' }, { name: 'EXCLUSIVE', path: '/Songs/Song-Drums_(EXCLUSIVE)_1.mp3' }, { name: 'PERSONAL', path: '/Songs/Song-Drums_(PERSONAL)_1.mp3' }, { name: 'PERSONAL_NOHATE', path: '/Songs/Song-Drums_(PERSONAL_NOHATE)_1.mp3' }, { name: 'PUBLIC_DOMAIN', path: '/Songs/Song-Vocals_(PUBLIC_DOMAIN)_1.mp3' }],
  })
  const [values, setValues] = useState({
    vocal: ['', ''],
    keys: ['', ''],
    bass: ['', ''],
    drum: ['', '']
  })
  const [pathArr, setPathArr] = useState([])


  const [selectedOption, setSelectedOption] = useState('vocal')

  return (
    <div className='bg-white relative h-full w-[100vw]'>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Same as */}
      <CrunkerComponent pathArr={pathArr} setBlob={setBlob} setPathArr={setPathArr} values={values} />
      <div className='flex justify-center pt-[2rem] gap-[4rem]'>
        <CustomButton onClick={() => { setSelectedOption('vocal'); setOpen(true) }} text={'Vocal'} />
        <CustomButton onClick={() => { setSelectedOption('keys'); setOpen(true) }} text={'Keys'} />
        <CustomButton onClick={() => { setSelectedOption('bass'); setOpen(true) }} text={'Bass'} />
        <CustomButton onClick={() => { setSelectedOption('drum'); setOpen(true) }} text={'Drum'} />
      </div>
      <div className='w-[100vw] flex justify-center mt-[4rem]'>
        <div className='min-w-[25rem] gap-[1rem] px-[1rem] h-[4rem] flex justify-center items-center border border-gray rounded-[50px]'>
          <img className={progress && `animate-spin`} src={cd.src} />
          <div className='h-[5px] w-[20rem] bg-gray'>
            <div style={{ width: `${(progress / duration) * 100}%` }} className='h-[5px] bg-yellow border border-gray'></div>
          </div>
          <p className='text-[12px]'>
            {progress !== '' ? `${progress}/${duration}` : 'No Remix'}
          </p>
        </div>
      </div>
      <div className='mt-[2rem] flex flex-col gap-[2rem] items-center w-[100vw]'>
        <div className='w-[40rem] flex gap-[2rem] flex-col items-end'>

          <div className='flex gap-[1rem] items-center'>
            <div className='font-[Citizen-OT-Medium] text-[26px] text-gray font-[700]'>Vocal</div>
            <div className='h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[30rem] flex items-center'>{values.vocal[0]}</div>
          </div>
          <div className='flex gap-[1rem] items-center'>
            <div className='font-[Citizen-OT-Medium] text-[26px] text-gray font-[700]'>Keys</div>
            <div className='h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[30rem] flex items-center'>{values.keys[0]}</div>
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
        <button onClick={redirectToMint} className='font-[Citizen-OT-Medium] flex items-center justify-center h-[4rem] w-[10rem] bg-yellow border border-gray text-[26px] text-gray font-[700]'>next</button>
      </div>

      <div className='flex flex-col justify-center items-center py-10'>
        <img className='w-[900px]' src={nft_license.src} />
        <Link target='_blank' href='https://a16zcrypto.com/introducing-nft-licenses/'>
          <p className='text-sm text-[#6F3EAA] cursor-pointer'>click here to know more...</p>
        </Link>
      </div>

      {blob !== null && <ReactPlayer autoPlay playsinline onDuration={e => setDuration(e.toFixed(2))} onProgress={e => setProgress(e.playedSeconds.toFixed(2))} loop={true} url={blob} playing />}
      <SafariModal values={values} setValues={setValues} selectedOption={selectedOption} items={items[selectedOption]} open={open} setOpen={setOpen} />
    </div>
  )
}

export default Home