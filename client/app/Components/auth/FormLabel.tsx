import React from 'react'

interface FormLabelProps {
    htmlFor: string;
    label: string;
}

export default function FormLabel({ htmlFor, label }: FormLabelProps) {
    return (
        <label htmlFor={htmlFor} className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#71B1D1] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
            {label}
        </label>
    )
}
