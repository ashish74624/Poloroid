import React from 'react'

interface IFormContainerProps {
    children: React.ReactElement | React.ReactElement[]
}

export default function FormContainer({ children }: IFormContainerProps) {
    return (
        <section className='bg-white w-80 lg:w-96 h-max py-4 pb-5 lg:pb-8  lg:py-8 rounded-xl px-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
            {children}
        </section>
    )
}
