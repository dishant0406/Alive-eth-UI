import React from 'react'
import search from '../assets/Search_Stroke.svg'
import SongCard from '../components/SongCard'
import { contract } from '../ether/SongFactory'
import { useEffect, useState } from 'react';
import Moralis from "moralis";
import axios from 'axios';

const Marketplace = () => {

  const [songArr, setSongsArr] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (
      async () => {
        setLoading(true)
        let songs = await contract.getAllSongs();
         console.log("songs", songs)
        const chain = 137
        const tokenId = 1
        let songsarr = []
        await Promise.all(songs.map(async (song) => {
          const response = await Moralis.EvmApi.nft.getNFTMetadata({
            address: song.songContract.toLowerCase(),
            chain,
            tokenId,
          });
         console.log("response")
          if (response) {
            const { data } = await axios.get(response.jsonResponse.token_uri)
            let newData = { ...data, id: song.songContract.toLowerCase(), hello: 'world' }
            songsarr.push(newData)
            console.log("newData", newData)
          }
        }))

        setSongsArr(songsarr)
        setLoading(false)
      }
    )()
  }, [])

  return (
    <div className='bg-white relative min-h-[100vh] w-[100vw]'>
      <div className='fixed md:static z-[100]'>
        <div className='flex items-center  justify-center w-[100vw] h-[15vh] md:h-[25vh] bg-green'>
          <p className='md:text-[96px]  text-[48px] md:mt-[-2rem] font-[Citizen-OT-Medium] font-[700] text-gray'>get your remix</p>
        </div>
        <div className="mb-[45px] py-12 alivebottomborder bg-white flex items-center justify-center ">
          <div className="flex gap-[1rem] md:gap-[2.5rem] items-center">
            <img src={search.src} className="h-[2rem] md:h-[3.5rem]" />
            <input
              style={{ fontFamily: "Nuform Sans" }}
              type="text"
              placeholder="search for an remix"
              className=" w-[45vw] px-[1rem] md:px-[2rem] h-[40px] md:h-[54px] bg-white border border-gray text-gray text-[16px]"
            />
          </div>
        </div>
      </div>
      <div>
        <div className={`w-[100vw] flex justify-center gap-[3rem] flex-wrap pt-[4-0vh] md:pt-[5rem] pt-[40vh] pb-[5rem] px-[2rem] ${loading ? 'h-[60vh]' : 'h-fit'} bg-gray`}>
          {songArr.map(song => {
            return <SongCard id={song.id} name={song.name} artist={song.artist} image={song.image} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Marketplace