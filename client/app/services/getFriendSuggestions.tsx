async function getFriendSuggestions(email: string) {
    let backendURL = process.env.BACKEND
    const res = await fetch(`${backendURL}user/getFriendSuggestions/${decodeURIComponent(email)}/`, { cache: 'no-store' });
    return res.json()
}

export { getFriendSuggestions }