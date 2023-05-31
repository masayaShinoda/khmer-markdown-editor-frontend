export default async function delete_article(
    token: string,
    article_id: string,
) {
    const url = `${import.meta.env.VITE_BACKEND_URL}/article/${article_id}/`

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        return response.json()

    } catch (err) {
        return { "error": err }
    }
}