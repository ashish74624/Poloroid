async function getLikedUsers(postId: string) {
    let backendURL = process.env.BACKEND

    const res = await fetch(`${backendURL}post/getLikedUsers/${postId}/`);
    return res.json()
}

export { getLikedUsers }