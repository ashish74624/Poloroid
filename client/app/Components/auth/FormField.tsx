import React from 'react'

interface IFormFieldProps {
    children: React.ReactElement | React.ReactElement[]
}

export default function FormField({ children }: IFormFieldProps) {
    return (
        <div className="relative z-0 w-full mb-3 md:mb-6 group">
            {children}
        </div>
    )
}
