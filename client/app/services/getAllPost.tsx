async function getAllPost(email: string) {
    let backendURL = process.env.BACKEND

    const res = await fetch(`${backendURL}post/allPost/${decodeURIComponent(email)}/`);
    return res.json();
}

export { getAllPost }