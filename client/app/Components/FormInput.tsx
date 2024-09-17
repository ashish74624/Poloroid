import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    type: string;
    name: string;
}

export default function FormInput({ id, type, name, ...props }: InputProps) {
    return (
        <input {...props} type={type} name={name} id={id} className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#71B1D1] peer' placeholder=' ' required
        />
    )
}
