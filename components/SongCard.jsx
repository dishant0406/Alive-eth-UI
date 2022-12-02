import sampleimage from '/assets/Main/Images/sampleImgc.svg'
import { useRouter } from 'next/router';
const SongCard = ({name, image, artist, id}) => {
  const router = useRouter()
  return (
    <div onClick={()=>router.push(`/${id}`)} className='h-[27rem] cursor-pointer hover:scale-[1.05] transition flex flex-col items-center w-[20rem] bg-white'>
    <img src={image || sampleimage.src} className='mt-[1.5rem] border border-gray object-contain w-[17rem] h-[17rem]' />
      <p className='text-[24px] font-[700]'>{name.slice(0,25)}...</p>
      <p className='text-[22px] font-[700] mt-[-0.5rem]'>{artist}</p>
      <div className='h-[4rem] mt-[1rem] flex items-center px-[2rem] border-t w-[20rem] border-gray'>
        <p className='text-[20px] font-[700] text-left'>#42069</p>
      </div>
    </div>
  )
}

export default SongCard