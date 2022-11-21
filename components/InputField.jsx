import React from 'react'

function InputField({paraName, inputType, placeholder, value, onChange}) {
    return (
        <>
            <p className="mt-10 font-gilroy">{paraName}</p>
            <div className="pt-2 w-64 sm:w-96">
                <input
                    type={inputType}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    className="w-full px-1 py-2 pl-4 text-md font-hairline placeholder-gray-400 border shadow  border-gray-400 focus:outline-none focus:ring focus:border-[#2563EB]"
                />
            </div>
        </>
    )
}

export default InputField