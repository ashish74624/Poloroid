"use client"

import { ReactNode, createContext,useContext,useState } from "react"

export const VisibilityContext = createContext({
    visibilty:"hello",
    setVisibility:()=>{}
})

type Props ={
    children?: ReactNode
}

export const CtgProvider = ({children}:Props)=>{
    const [visibilty,setVisibility]:any = useState("")

    

    return(
        <VisibilityContext.Provider value={{visibilty,setVisibility}}>
            {children}
        </VisibilityContext.Provider>
    )

}
export const useVisible = ()=>{
    return useContext(VisibilityContext)
    }