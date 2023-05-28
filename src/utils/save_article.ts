// export default async function save_article(token: string) {
//     const url = `${import.meta.env.VITE_BACKEND_URL}/check-token/`

//     try {
//         const response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 "access_token": token,
//             })
//         })
//         return response.json()
//     } catch (err) {
//         return { "error": err }
//     }
// }