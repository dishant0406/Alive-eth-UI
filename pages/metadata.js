function MetaData() {
    return (
        <div className="h-[100vh] w-full bg-white">
            <h1 className="text-4xl font-bold text-black text-center py-8">Enter Metadata</h1>
            <div className="flex justify-center items-center flex-col">
                <p className="mt-10 font-gilroy  mb-2">Metadata(1)</p>
                <div className="pt-2 mb-3 w-96">
                    <input
                        type="text"
                        placeholder="metadata(1)"
                        className="w-full px-1 py-2 pl-4 text-md font-hairline placeholder-gray-400 border shadow  border-gray-400 focus:outline-none focus:ring focus:border-[#2563EB]"
                    />
                </div>
                <p className="mt-10 font-gilroy  mb-2">Metadata(2)</p>
                <div className="pt-2 mb-3 w-96 ">
                    <input
                        placeholder="metadata(2)"
                        className="w-full px-1 py-2 pl-4 text-md font-hairline placeholder-gray-400 border shadow  border-gray-400 focus:outline-none focus:ring focus:border-[#2563EB]"
                    />
                </div>
            </div>
        </div>
    );
}
export default MetaData;
