import { useState } from "react";
import InputField from "../components/InputField";

function MetaData() {
    const [file, setFile] = useState();
    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
        console.log(file)
    }
    return (
        <div className="metadata bg-white h-[100vh] overflow-hidden">
            <h1 className="text-4xl font-bold text-black text-center py-8">Enter Metadata</h1>
            <div className="flex justify-center">
                <div className="flex justify-center items-start flex-col">

                    <InputField paraName='Name of the song' inputType='text' placeholder='name of the song' />

                    <p className="mt-10 font-gilroy">Cover Image</p>
                    <div className="mt-2 w-64 sm:w-96 flex bg-[#e5e6e3] border-2 border-dashed border-[#d3d1d1] shadow">
                        <input
                            type="file"
                            onChange={handleChange}
                            className="w-full py-1 pl-2 sm:py-2 sm:pl-4 text-md font-hairline placeholder-gray-400 cursor-pointer"
                        />
                        {file && <img className="h-10 sm:h-12 -mr-[.5px]" src={file} />}
                    </div>        

                    <InputField paraName='Artist Name' inputType='text' placeholder='artist name' />
                    <InputField paraName='Description' inputType='text' placeholder='description' />

                    <div className="w-full flex justify-end mt-9 pb-[58px]">
                        <button className='font-[Citizen-OT-Medium] flex items-center justify-center h-[3.2rem] w-[6rem] bg-yellow border border-gray text-[26px] text-gray font-[700]'>next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MetaData;
