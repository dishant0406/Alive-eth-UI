import Crunker from "crunker";
import { useEffect } from 'react';

const CrunkerComponent = ({pathArr, setPathArr, values, setBlob, setRealBlob})=>{
  
  useEffect(() => {

    setPathArr([values.vocal[1],values.keys[1],values.bass[1],values.drum[1] ])
    
  }, [values])

  useEffect(()=>{
    const crunker = new Crunker({sampleRate:48000})
    let tmp;
    const newArr = pathArr.filter(el=>el!=='')

    if(newArr.length!==0){
      console.log(newArr)
      crunker
      .fetchAudio(...newArr)
      .then((buffers) => crunker.mergeAudio(buffers))
      .then((merged) => crunker.export(merged, 'audio/mp3'))
      .then((output) => {
       setRealBlob(output.blob)
       setBlob(URL.createObjectURL(output.blob))
      }
      
      )
      .catch((error) => {
        console.log(error)
      });
    }
  },[pathArr])

  return <></>
}

export default CrunkerComponent