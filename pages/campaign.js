import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'
import logo from '/assets/Main/Images/Logo.svg'
import Rocket from '/assets/Main/Images/JetPackc.svg'
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
    <div className='h-[100vh] flex flex-col justify-start w-[100vw] bg-white'>
      <div className='w-[100vw] h-[370px] justify-start pt-[24px] gap-[24px] mb-[27px] flex flex-col items-center bg-gray alivebottomborderMobReaverse'>
        <div className='w-[100vw]  flex justify-center'>
          <Image height={logo.height} alt='Alive Logo' width={logo.width} src={logo.src} />
        </div>
        {isMobile && <div className='relative'>
          <img src={card.src} />
          <div style={{ backgroundImage: `url(${sampleImage.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} className='w-[348px] absolute top-[8px] left-[8px] h-[222px] bg-gray'></div>
          <button style={{ letterSpacing: '0.02em' }} className='flex absolute px-[0.5rem] text-gray left-[116px] h-[36px] bottom-[36px] font-[700] gap-[0.5rem] bg-yellow justify-center font-[Citizen-OT-Medium] text-[18px]  items-center'>
            <Image src={notification.src} height={20} width={20} alt='Notification Icon' />
            get notified
          </button>
        </div>
        }
      </div>
      <div className='w-[100%] h-[295px] gap-[60px] flex flex-col mt-[40px]'>
        <div className='w-[100%] flex justify-center'>
          <Slider {...settings} className='w-[301px] h-[10rem] '>
            <div className='w-[301px] claimcard h-[150px] overflow-hidden border border-gray relative bg-green'>
              <img src={Rocket.src} className='absolute h-[150px] bottom-[-1.6rem] right-[1rem] ' />
              <p style={{ lineHeight: '28px', letterSpacing: '0.025em' }} className='text-[26px] text-gray w-[10rem] ml-[20px] font-[Citizen-OT-Medium] font-[700] '>Claim your jetpack now</p>
              <button style={{ fontFamily: 'Nuform Sans' }} className='px-[12px] ml-[20px] py-[6px] text-[16px] text-gray font-[500] bg-yellow border border-gray'>claim</button>
            </div>
            {/* <div className='w-[20rem] h-[10rem] claimcard overflow-hidden border border-gray relative bg-red'>
              <img src={Star.src} className='absolute h-[10rem] bottom-[-1.6rem] right-[0] ' />
              <p style={{ lineHeight: '28px' }} className='text-[26px] w-[19rem] ml-[1rem] font-[Citizen-OT-Medium] font-[700] '>Get on the whitelist for a 15% discount</p>
              <button className='px-[1rem] ml-[1rem] h-[3rem] text-[18px] font-[700] bg-yellow border border-gray'>enroll</button>
            </div> */}
          </Slider>
        </div>
        <div className='flex w-[100vw] items-center justify-center gap-[2rem]'>
          <img className='h-[20px]' src={Facebook.src} />
          <img className='h-[20px]' src={Twitter.src} />
          <img className='h-[20px]' src={Instagram.src} />
          <img className='h-[20px]' src={LinkedIn.src} />
          <img className='h-[20px]' src={Discord.src} />
          <img className='h-[20px]' src={Medium.src} />
        </div>
      </div>
    </div>
  )
}

export default Campaign