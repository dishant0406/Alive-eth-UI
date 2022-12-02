import { useRouter } from "next/router"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Moralis from 'moralis';
import Frame from '/assets/Main/Images/Frame.svg'

const RemixNft = () => {
  const router = useRouter()
  const { id } = router.query
  const [songData, setSongData] = useState({})

  useEffect(() => {
    (
      async () => {

        if (id) {

          const chain = 137
          const tokenId = 1
          const response = await Moralis.EvmApi.nft.getNFTMetadata({
            address: id,
            chain,
            tokenId,
          });
          const { data } = await axios.get(response.jsonResponse.token_uri)
          setSongData(data)
        }

      }
    )()
  }, [id])
  return (
    <div className="bg-gray min-h-[100vh] flex items-center justify-center w-[100vw]">
      <div className="w-[90vw] aliveborder bg-white min-h-[85vh] justify-around flex flex-wrap items-center ">
        <div className="h-[60vh] md:w-[50vw] flex flex-col justify-start">
          <p className="text-gray text-[36px] font-[600]">{songData?.artist}</p>
          <p className="text-gray mt-[-1rem] md:flex hidden text-[64px] font-[600]">{songData?.title?.slice(0, 25)}{songData?.title?.length > 25 ? '...' : ''}</p>
          <p className="text-gray mt-[-1rem] md:hidden flex text-[64px] font-[600]">{songData?.title?.slice(0, 10)}{songData?.title?.length > 10 ? '...' : ''}</p>
          <div className="h-fit mountsholder w-[80vw] md:w-[50vw] bg-gray flex flex-col items-center">
            <p className="w-[90%] pr-[1rem] overflow-y-scroll h-[20vh] text-white text-[18px] mt-[1rem]">{songData.description}</p>
            <p className="mt-[1rem] text-white text-[28px] font-[600]">1 Matic</p>
            <button className="w-[10rem] mb-[1rem] h-[4rem] bg-yellow text-gray border border-gray text-[20px] mt-[0.5rem] font-[600]">mint</button>
          </div>
        </div>
        <div className="relative mt-[4rem] mb-[2rem] md:mt-[0] md:mb-[0]">
          <img src={Frame.src} className='h-[40vh] md:h-[60vh]' />
          <img src={songData?.artwork?.uri} className=' absolute top-[10px] border border-gray left-[10px] h-[37vh] md:h-[56vh]' />
        </div>
      </div>
    </div>
  )
}

export default RemixNft