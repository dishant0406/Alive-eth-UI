import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'
import logo from '/assets/Main/Images/Logo.svg'
import Rocket from '/assets/Main/Images/Rocketc.svg'
import sampleImage from '/assets/Main/Images/image2.png'
import notification from '/assets/Main/Images/notifications.svg'
import Star from '/assets/Main/Images/Star.svg'
import card from '/assets/Main/Images/card.svg'
import { useState } from 'react';
import { useEffect } from 'react';

//social Icons Import
import Discord from '/assets/Main/Social/Discord.svg'
import Facebook from '/assets/Main/Social/Facebook.svg'
import Instagram from '/assets/Main/Social/Instagram.svg'
import LinkedIn from '/assets/Main/Social/LinkedIn.svg'
import Medium from '/assets/Main/Social/Medium.svg'
import Twitter from '/assets/Main/Social/Twitter.svg'
import Slider from 'react-slick'

const Campaign = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const [isMobile, setIsMobile] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  useEffect(() => {
    isTabletOrMobile && setIsMobile(true)

  }, [isTabletOrMobile])

  return (
    <div className='h-[100vh] flex flex-col justify-between w-[100vw] bg-white'>
      <div className='w-[100vw] h-[370px] justify-center gap-[2rem] flex flex-col items-center bg-gray alivebottomborderMob'>
        <div className='w-[100vw] mt-[1rem]  flex justify-center'>
          <Image height={logo.height} alt='Alive Logo' width={logo.width} src={logo.src} />
        </div>
        {isMobile && <div className='relative'>
          <img src={card.src} />
          <div style={{ backgroundImage: `url(${sampleImage.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} className='w-[348px] absolute top-[8px] left-[8px] h-[222px] bg-gray'></div>
          <button className='flex absolute px-[0.5rem] text-gray left-[116px] h-[36px] bottom-[36px] font-[700] gap-[0.5rem] bg-yellow justify-center font-[Citizen-OT-Medium] text-[18px]  items-center'>
            <Image src={notification.src} height={notification.height} width={'25'} alt='Notification Icon' />
            get notified
          </button>
        </div>
        }
      </div>
      <div className='w-[100%] flex justify-center'>
        <Slider {...settings} className='w-[20rem] h-[10rem] '>
          <div className='w-[20rem] claimcard h-[10rem] overflow-hidden border border-gray relative bg-green'>
            <img src={Rocket.src} className='absolute h-[10rem] bottom-[-1.6rem] right-[1rem] ' />
            <p style={{ lineHeight: '28px' }} className='text-[26px] w-[10rem] ml-[1rem] font-[Citizen-OT-Medium] font-[700] '>Claim your jetpack now</p>
            <button className='px-[1rem] ml-[1rem] h-[3rem] text-[18px] font-[700] bg-yellow border border-gray'>claim</button>
          </div>
          <div className='w-[20rem] h-[10rem] claimcard overflow-hidden border border-gray relative bg-red'>
            <img src={Star.src} className='absolute h-[10rem] bottom-[-1.6rem] right-[0] ' />
            <p style={{ lineHeight: '28px' }} className='text-[26px] w-[19rem] ml-[1rem] font-[Citizen-OT-Medium] font-[700] '>Get on the whitelist for a 15% discount</p>
            <button className='px-[1rem] ml-[1rem] h-[3rem] text-[18px] font-[700] bg-yellow border border-gray'>enroll</button>
          </div>
        </Slider>
      </div>
      <div className='flex h-[1.5rem] mb-[2rem] w-[100vw] justify-around'>
        <img src={Discord.src} />
        <img src={Facebook.src} />
        <img src={Instagram.src} />
        <img src={LinkedIn.src} />
        <img src={Medium.src} />
        <img src={Twitter.src} />

      </div>
    </div>
  )
}

export default Campaign