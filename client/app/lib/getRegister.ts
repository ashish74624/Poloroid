type Params ={
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    
}

export default async function getRegister({firstName,lastName,email,password}:Params){
    const res = await fetch('http://localhost:3001/register/',{
        method:"POST",
        headers:{
            'Content-Type':'Application/json'
        },
        body: JSON.stringify({
            firstName,lastName,email,password
        })
    })
}