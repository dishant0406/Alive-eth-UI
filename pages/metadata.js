import { useState } from "react";

function MetaData() {
    const [file, setFile] = useState();
    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
        console.log(file)
    }
    return (
        <div className="h-full w-full bg-white">
            <h1 className="text-4xl font-bold text-black text-center py-8">Enter Metadata</h1>
            <div className="flex justify-center ">
                <div className="flex justify-center items-start flex-col">
                    <p className="mt-3 font-gilroy">Name of the song</p>
                    <div className="pt-2 w-96">
                        <input
                            type="text"
                            placeholder="name of the song"
                            className="w-full px-1 py-2 pl-4 text-md font-hairline placeholder-gray-400 border shadow  border-gray-400 focus:outline-none focus:ring focus:border-[#2563EB]"
                        />
                    </div>
                    <p className="mt-10 font-gilroy">Cover Image</p>
                    <div className="mt-2 w-96 flex border border-gray-400 shadow">
                        <input
                            type="file"
                            onChange={handleChange}
                            className="w-full py-2 pl-4 text-md font-hairline placeholder-gray-400 cursor-pointer"
                        />
                        {file && <img className="h-12 -mr-[.5px]" src={file} />}
                    </div>
                    <p className="mt-10 font-gilroy">Artists name</p>
                    <div className="pt-2 w-96 ">
                        <input
                            placeholder="artists name"
                            className="w-full px-1 py-2 pl-4 text-md font-hairline placeholder-gray-400 border shadow  border-gray-400 focus:outline-none focus:ring focus:border-[#2563EB]"
                        />
                    </div>
                    <p className="mt-10 font-gilroy">Description</p>
                    <div className="pt-2 w-96 ">
                        <textarea
                            placeholder="description"
                            className="w-full px-1 py-2 pl-4 text-md font-hairline placeholder-gray-400 border shadow  border-gray-400 focus:outline-none focus:ring focus:border-[#2563EB]"
                        />
                    </div>
                    <div className="w-full flex justify-end mt-9 pb-[58px]">
                        <button className='font-[Citizen-OT-Medium] flex items-center justify-center h-[3.2rem] w-[6rem] bg-yellow border border-gray text-[26px] text-gray font-[700]'>next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MetaData;
