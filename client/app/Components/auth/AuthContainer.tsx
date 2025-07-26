import React from 'react'

interface IAuthContainerProps {
    children: React.ReactElement | React.ReactElement[]
}

export default function AuthContainer({ children }: IAuthContainerProps) {
    return (
        <section className='bg-primaryBlue h-screen flex flex-col items-center justify-center overflow-x-hidden overflow-y-scroll gap-8'>{children}</section>
    )
}
