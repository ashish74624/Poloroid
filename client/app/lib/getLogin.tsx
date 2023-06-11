export default async function getLogin(){
    let res = await fetch('https://localhost:3001/login/',{
        method:"POST",
        headers:{
            'Content-Type':'Application/json'
        }
    })
}