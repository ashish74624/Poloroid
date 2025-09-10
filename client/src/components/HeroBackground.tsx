import React from 'react'
import heroImage from "../assets/polorid-hero.jpg"

export default function HeroBackground() {
    return (
        <div className="absolute inset-0 z-0">
            <img
                src={heroImage}
                alt="Vintage polaroid camera"
                className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70"></div>
        </div>
    )
}
