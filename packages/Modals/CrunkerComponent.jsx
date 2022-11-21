import Crunker from "crunker";
import { useEffect } from 'react';

const CrunkerComponent = ({pathArr, setPathArr, values})=>{
  
  useEffect(() => {

    setPathArr([values.vocal[1],values.guitar[1],values.bass[1],values.drum[1] ])
    
  }, [values])

  useEffect(()=>{
    const crunker = new Crunker({sampleRate:48000})

    const newArr = pathArr.filter(el=>el!=='')

    if(newArr.length!==0 && newArr.length>1){
      console.log(newArr)
      crunker
      .fetchAudio(...newArr)
      .then((buffers) => crunker.mergeAudio(buffers))
      .then((merged) => crunker.export(merged, 'audio/mp3'))
      .then((output) => crunker.download(output.blob))
      .catch((error) => {
        console.log(error)
      });
    }
  },[pathArr])

  return <></>
}

export default CrunkerComponent