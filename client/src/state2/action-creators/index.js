export const changeFirstName =(value)=>{
    return (dispatch)=>{
        dispatch({
            type:'changeFirstName',
            payloade:value 
        })
    }
}
export const changeLastname =(value)=>{
    return (dispatch)=>{
        dispatch({
            type:'changeLastname',
            payloade:value 
        })
    }
}
export const changeEmail =(value)=>{
    return (dispatch)=>{
        dispatch({
            type:'changeEmail',
            payloade:value 
        })
    }
}
export const changePassword =(value)=>{
    return (dispatch)=>{
        dispatch({
            type:'changePassword',
            payloade:value 
        })
    }
}