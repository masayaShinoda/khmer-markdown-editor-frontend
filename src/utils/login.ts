export default async function login(username: string, password: string) {
    const url = `${import.meta.env.VITE_BACKEND_URL}/token/`

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
        return response.json()
    } catch (err) {
        return { "error": err }
    }
}