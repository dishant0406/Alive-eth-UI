import Link from "next/link";
import React from "react";
import nft_license from "/assets/Main/Images/nft_license.png";

const Home = () => {
  return (
     <div className="bg-white flex justify-center relative h-full w-screen]">
      <div className="p-10">
        <h1 className=" text-center text-4xl">
          The a.live remix tool allows you to mashup any pieces of music
          together to make your own.
        </h1>
        <p className=" text-2xl pt-10 px-10">
          If the original artist’s licenses allow it (exclusive, personal use
          and public domain), you can also mint your new piece of music, with a
          share of the revenue from your sales going to those artists.
        </p>
        <p className=" text-2xl pt-10 px-10">
          If the licenses restrict you from using their music from commercial
          use (flagged as commercial licenses), you can still remix these songs
          and keep them for your own enjoyment.
        </p>

        <div className="flex flex-col justify-center items-center py-10">
          <img className="w-full" src={nft_license.src} />
        </div>
        <div className="flex justify-between items-center">
          <Link
            target="_blank"
            href="https://a16zcrypto.com/introducing-nft-licenses/"
          >
            <p className="text-sm text-[#6F3EAA] cursor-pointer">
              click here to know more...
            </p>
          </Link>
          <Link href="/remix">
            <button className="font-[Citizen-OT-Medium] flex items-center justify-center h-[4rem] w-[10rem] bg-yellow border border-gray text-[26px] text-gray font-[700]">
              next
            </button>
          </Link>
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
            <div className='font-[Citizen-OT-Medium] text-[26px] text-gray font-[700]'>keys</div>
            <div className='h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[25rem] flex items-center'>{values.keys[0]}</div>
            <div className="relative bg-white pt-1">
              <input
                type="range"
                value={volumes.keys}
                max={1}
                min={0}
                step={0.1}
                onChange={(e) => setVolumes({ ...volumes, keys: e.target.value })}
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
    </div>
  );
};

export default Home;
