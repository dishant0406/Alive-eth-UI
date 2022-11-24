import React from 'react'
import CustomButton from '../components/CustomButton'
import SafariModal from '../packages/Modals/SelectModal';
import cd from '/assets/Main/Images/CD.svg'
import { useState } from 'react';
import dynamic from 'next/dynamic';

const CrunkerComponent = dynamic(() => import('../packages/Modals/CrunkerComponent.jsx'), {
  ssr: false
})

import { useEffect } from 'react';
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import ReactAudioPlayer from 'react-audio-player';

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
  const [duration, setDuration] = useState('')
  const [progress, setProgress] = useState('')
  const [items, setItems] = useState({
    vocal: [{ muted: true, name: 'COMMERCIAL', path: '/Songs/Song-Vocals_(COMMERCIAL)_1.mp3' }, { muted: true, name: 'COMMERCIAL_NOHATE', path: '/Songs/Song-Vocals_(COMMERCIAL_NOHATE)_1.mp3' }, { muted: true, name: 'EXCLUSIVE', path: '/Songs/Song-Keys_(EXCLUSIVE)_1.mp3' }, { muted: true, name: 'PERSONAL', path: '/Songs/Song-Vocals_(PERSONAL)_1.mp3' }, { muted: true, name: 'PERSONAL_NOHATE', path: '/Songs/Song-Vocals_(PERSONAL_NOHATE)_1.mp3' }, { muted: true, name: 'PUBLIC_DOMAIN', path: '/Songs/Song-Vocals_(PUBLIC_DOMAIN)_1.mp3' }],
    guitar: [{ muted: true, name: 'COMMERCIAL', path: '/Songs/Song-Keys_(COMMERCIAL)_1.mp3' }, { muted: true, name: 'COMMERCIAL_NOHATE', path: '/Songs/Song-Keys_(COMMERCIAL_NOHATE).mp3' }, { muted: true, name: 'EXCLUSIVE', path: '/Songs/Song-Keys_(EXCLUSIVE)_1.mp3' }, { muted: true, name: 'PERSONAL', path: '/Songs/Song-Keys_(PERSONAL)_1.mp3' }, { muted: true, name: 'PERSONAL_NOHATE', path: '/Songs/Song-Keys_(PERSONAL_NOHATE)_1.mp3' }, { muted: true, name: 'PUBLIC_DOMAIN', path: '/Songs/Song-Keys_(PUBLIC_DOMAIN)_1.mp3' }],
    bass: [{ muted: true, name: 'COMMERCIAL', path: '/Songs/Song-Bass_(COMMERCIAL)_1.mp3' }, { muted: true, name: 'COMMERCIAL_NOHATE', path: '/Songs/Song-Keys_(COMMERCIAL_NOHATE)_2.mp3' }, { muted: true, name: 'EXCLUSIVE', path: '/Songs/Song-Bass_(EXCLUSIVE)_1.mp3' }, { muted: true, name: 'PERSONAL', path: '/Songs/Song-Bass_(PERSONAL)_1.mp3' }, { muted: true, name: 'PERSONAL_NOHATE', path: '/Songs/Song-Bass_(PERSONAL_NOHATE)_1.mp3' }, { muted: true, name: 'PUBLIC_DOMAIN', path: '/Songs/Song-Bass_(PUBLIC_DOMAIN)_1.mp3' }],
    drum: [{ muted: true, name: 'COMMERCIAL', path: '/Songs/Song-Drums_(COMMERCIAL)_1.mp3' }, { muted: true, name: 'COMMERCIAL_NOHATE', path: '/Songs/Song-Drums_(COMMERCIAL_NOHATE)_1.mp3' }, { muted: true, name: 'EXCLUSIVE', path: '/Songs/Song-Drums_(EXCLUSIVE)_1.mp3' }, { muted: true, name: 'PERSONAL', path: '/Songs/Song-Drums_(PERSONAL)_1.mp3' }, { muted: true, name: 'PERSONAL_NOHATE', path: '/Songs/Song-Drums_(PERSONAL_NOHATE)_1.mp3' }, { muted: true, name: 'PUBLIC_DOMAIN', path: '/Songs/Song-Vocals_(PUBLIC_DOMAIN)_1.mp3' }],
  })
  const [values, setValues] = useState({
    vocal: ['', ''],
    guitar: ['', ''],
    bass: ['', ''],
    drum: ['', '']
  })

  const [volumes, setVolumes] = useState({
    vocal: 1,
    guitar: 1,
    bass: 1,
    drum: 1,
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
            <div className='h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[25rem] flex items-center'>{values.vocal[0]}</div>
            <div className="relative bg-white pt-1">
              <input
                value={volumes.vocal}
                max={1}
                min={0}
                step={0.1}
                onChange={(e) => setVolumes({ ...volumes, vocal: e.target.value })}
                type="range"
                className="
                form-range
                w-full
                accent-red
                h-6
                p-0
                bg-white
                    "
                id="customRange1"
              />
            </div>
          </div>
          <div className='flex gap-[1rem] items-center'>
            <div className='font-[Citizen-OT-Medium] text-[26px] text-gray font-[700]'>Guitar</div>
            <div className='h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[25rem] flex items-center'>{values.guitar[0]}</div>
            <div className="relative bg-white pt-1">
              <input
                type="range"
                value={volumes.guitar}
                max={1}
                min={0}
                step={0.1}
                onChange={(e) => setVolumes({ ...volumes, guitar: e.target.value })}
                className="
                form-range
                w-full
                accent-red
                h-6
                p-0
                bg-white

                    "
                id="customRange1"
              />
            </div>
          </div>
          <div className='flex gap-[1rem] items-center'>
            <div className='font-[Citizen-OT-Medium] text-[26px] text-gray font-[700]'>Bass</div>
            <div className='h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[25rem] flex items-center'>{values.bass[0]}</div>
            <div className="relative bg-white pt-1">
              <input
                type="range"
                value={volumes.bass}
                max={1}
                min={0}
                step={0.1}
                onChange={(e) => setVolumes({ ...volumes, bass: e.target.value })}
                className="
                form-range
                w-full
                accent-red
                h-6
                p-0
                bg-white

                    "
                id="customRange1"
              />
            </div>
          </div>
          <div className='flex gap-[1rem] items-center'>
            <div className='font-[Citizen-OT-Medium] text-[26px] text-gray font-[700]'>Drum</div>
            <div className='h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[25rem] flex items-center'>{values.drum[0]}</div>
            <div className="relative bg-white pt-1">
              <input
                type="range"
                value={volumes.drum}
                max={1}
                min={0}
                step={0.1}
                onChange={(e) => setVolumes({ ...volumes, drum: e.target.value })}
                className="
                form-range
                w-full
                accent-red
                h-6
                p-0
                bg-white

                    "
                id="customRange1"
              />
            </div>
          </div>
        </div>
      </div>
      <div className='w-[100vw] flex justify-center mt-[2rem]'>
        <button className='font-[Citizen-OT-Medium] flex items-center justify-center h-[4rem] w-[10rem] bg-yellow border border-gray text-[26px] text-gray font-[700]'>next</button>
      </div>
      {
        items.vocal.map((single) => {
          return <ReactAudioPlayer volume={+volumes.vocal} autoPlay muted={single.muted} playsinline loop={true} src={single.path} playing />
        })
      }
      {
        items.bass.map((single) => {
          return <ReactAudioPlayer volume={+volumes.bass} autoPlay muted={single.muted} playsinline loop={true} src={single.path} playing />
        })
      }
      {
        items.drum.map((single) => {
          return <ReactAudioPlayer volume={+volumes.drum} autoPlay muted={single.muted} playsinline loop={true} src={single.path} playing />
        })
      }
      {
        items.guitar.map((single) => {
          return <ReactAudioPlayer volume={+volumes.guitar} autoPlay muted={single.muted} playsinline loop={true} src={single.path} playing />
        })
      }

      <SafariModal setItems={setItems} values={values} setValues={setValues} selectedOption={selectedOption} allItems={items} items={items[selectedOption]} open={open} setOpen={setOpen} />
    </div>
  )
}

export default Home