export default async function check_token(token: string) {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/check-token/`

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "access_token": token,
            })
        })
        return response.json()
    } catch (err) {
        return { "error": err }
    }
}