const reducer=(state='',action)=>{
    if(action.type ==='changeFirstName'){
        return action.payload;
    }
    else if (action.type==="changeLastName"){
        return action.payload
    }
    else if(action.type ==="changeEmail"){
        return action.payload;
    }
    else if(action.type ==="changePassword"){
        return action.payload;
    }
    else{
        return state;
    }
}
export default reducer;