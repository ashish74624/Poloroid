async function getData(email: string) {
    let backendURL = process.env.BACKEND

    const res = await fetch(`${backendURL}user/data/${decodeURIComponent(email)}/`);
    return res.json()
}

export { getData }