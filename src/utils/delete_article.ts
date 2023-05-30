export default async function delete_article(
    token: string, 
    slug: string,
) {
    const url = `${import.meta.env.VITE_BACKEND_URL}/article/${slug}/`

    let response

    try {
        response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "slug": slug,
            })
        })
    } catch (err) {
        return { "error": err }
    }

    if(response?.ok) {
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