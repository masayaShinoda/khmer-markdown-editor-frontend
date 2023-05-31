export default async function save_article(
    token: string,
    slug: string,
    title: string,
    category: string,
    content: string
) {
    const url = `${import.meta.env.VITE_BACKEND_URL}/article/`

    let response

    try {
        response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "slug": slug,
                "title": title,
                "category": category,
                "content": content,
            })
        })
    } catch (err) {
        return { "error": err }
    }

    if (response?.ok) {
        return response.json()
    } else {
        return {
            "error": {
                "code": response?.status,
                "message": response?.json()
            }
        }
    }
}