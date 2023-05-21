export default async function register(username: string, email: string, password: string) {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/register/`

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            })
        })
        return response.json()
    } catch (err) {
        return { "error": err }
    }
}