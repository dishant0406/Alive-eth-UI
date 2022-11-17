import React from 'react'
import CustomButton from '../components/CustomButton'
import SafariModal from '../packages/Modals/SelectModal';
import { useState } from 'react';

const Home = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([{ name: 'Track 1' }, { name: 'Track 2' }, { name: 'Track 3' }, { name: 'Track 4' }, { name: 'Track 5' }])
  const [values, setValues] = useState({
    vocal: '',
    guitar: '',
    bass: '',
    drum: ''
  })
  const [selectedOption, setSelectedOption] = useState('')

  return (
    <div className='bg-white relative h-[100vh] w-[100vw]'>
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
            <div className='h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[30rem] flex items-center'>{values.vocal}</div>
          </div>
          <div className='flex gap-[1rem] items-center'>
            <div className='font-[Citizen-OT-Medium] text-[26px] text-gray font-[700]'>Guitar</div>
            <div className='h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[30rem] flex items-center'>{values.guitar}</div>
          </div>
          <div className='flex gap-[1rem] items-center'>
            <div className='font-[Citizen-OT-Medium] text-[26px] text-gray font-[700]'>Bass</div>
            <div className='h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[30rem] flex items-center'>{values.bass}</div>
          </div>
          <div className='flex gap-[1rem] items-center'>
            <div className='font-[Citizen-OT-Medium] text-[26px] text-gray font-[700]'>Drum</div>
            <div className='h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[30rem] flex items-center'>{values.drum}</div>
          </div>
        </div>
      </div>
      <div className='w-[100vw] flex justify-center mt-[2rem]'>
        <button className='font-[Citizen-OT-Medium] flex items-center justify-center h-[4rem] w-[10rem] bg-yellow border border-gray text-[26px] text-gray font-[700]'>next</button>
      </div>
      <SafariModal values={values} setValues={setValues} selectedOption={selectedOption} items={items} open={open} setOpen={setOpen} />
    </div>
  )
}

export default Home