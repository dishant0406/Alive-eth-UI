import sampleimage from '/assets/Main/Images/sampleImgc.svg'
const SongCard = () => {
  return (
    <div className='h-[27rem] hover:scale-[1.05] transition flex flex-col items-center w-[20rem] bg-white'>
    <img src={sampleimage.src} className='mt-[1.5rem] border border-gray object-contain w-[17rem] h-[17rem]' />
      <p className='text-[24px] font-[700]'>Song Editon</p>
      <p className='text-[22px] font-[700] mt-[-0.5rem]'>Name</p>
      <div className='h-[4rem] mt-[1rem] flex items-center px-[2rem] border-t w-[20rem] border-gray'>
        <p className='text-[20px] font-[700] text-left'>#42069</p>
      </div>
    </div>
  )
}

export default SongCard