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
    <div className="bg-white h-[100vh] flex items-center justify-center w-[100vw]">
      <div className="w-[90vw] h-[90vh] justify-around flex items-center ">
        <div className="h-[60vh] w-[50vw] flex flex-col justify-start">
          <p className="text-gray text-[36px] font-[600]">{songData?.artist}</p>
          <p className="text-gray mt-[-1rem] text-[64px] font-[600]">{songData?.title?.slice(0, 25)}{songData?.title?.length > 25 ? '...' : ''}</p>
          <div className="h-[30vw] mountsholder w-[50vw] bg-gray flex flex-col items-center">
            <p className="w-[90%] pr-[1rem] overflow-y-scroll h-[20vh] text-white text-[18px] mt-[1rem]">{songData.description}</p>
            <p className="mt-[1rem] text-white text-[28px] font-[600]">1 Matic</p>
            <button className="w-[10rem] h-[4rem] bg-yellow text-gray border border-gray text-[20px] mt-[0.5rem] font-[600]">mint</button>
          </div>
        </div>
        <div className="relative">
          <img src={Frame.src} className='h-[60vh]' />
          <img src={songData?.artwork?.uri} className=' absolute top-[10px] border border-gray left-[10px] h-[56vh]' />
        </div>
      </div>
    </div>
  )
}

export default RemixNft