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
    </div>
  );
};

export default Home;
