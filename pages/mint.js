import Link from "next/link";
import React from "react";

function Remix() {
  return (
    <div className="bg-gray h-[100vh] w-full">
      <div className="flex flex-col justify-center items-center tracking-[0.08em]">
        <h1 className="text-red pt-12 text-6xl">YOUR REMIX IS READY !</h1>
        <h3 className="text-white pt-8 text-5xl">Name</h3>
      </div>

      <div className="flex justify-center space-x-16 text-4xl pt-16 tracking-[0.08em]">
        <div className="text-white">
          <p>REVENUE</p>
          <p className="text-xl">SHARE TO ORIGINAL</p>
        </div>
        <div className="text-green flex items-center font-bold">
          <div className="py-4 px-5 border-[1px] border-white">0.5%</div>
          <div className="py-4 px-5 border-[1px] border-white">10%</div>
          <div className="py-4 px-5 border-[1px] border-white">20%</div>
          <div className="py-4 px-5 border-[1px] border-white">30%</div>
        </div>
      </div>

      <div className="flex text-white justify-center text-3xl pt-16 tracking-[0.08em]">
        <p>Artists</p>
      </div>

      <div className="flex justify-center items-center space-x-16 text-4xl pt-8 tracking-[0.08em]">
        <div className="text-white text-2xl">
          <p>YOUR SHARES</p>
        </div>
        <div className="text-green flex items-center text-2xl font-bold">
          <div className="py-4 px-5 border-[1px] border-white">70%</div>
        </div>
        <div>
          <Link href="/metadata">
            <button className="bg-yellow font-semibold text-black text-2xl px-3 py-[5px] border-2 border-black ">
              MINT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Remix;
