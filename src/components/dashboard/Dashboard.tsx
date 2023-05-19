import { 
  FunctionComponent,
  useContext,
  useState,
  useEffect,
} 
from "react"
import Card from "./Card"
import { UserContext } from "../../context/UserContext"

const Dashboard: FunctionComponent = () => {
  const { user, accessToken } = useContext(UserContext)


  interface Article {
    key: number,
    id: number,
    title: string,
    updated_at: string,
    created_at: string,
  }

  const [articles, setArticles] = useState<Array<Article>>([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/articles`, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        if(data) {
          const articles: Array<Article> = Array.from(data)
          
          setArticles(articles.map((article: Article, index: number) => {
              return {
                key: index,
                id: article.id,
                title: article.title,
                updated_at: article.updated_at,
                created_at: article.created_at,
              }
            })
          )
        } else {
          return "Error fetching data."
        }
      })
  }, [accessToken])

  return <div>
    <h1>ទំព័រដើម</h1>
    {user ? <p>សួស្តី {user.username}។</p> : null}
    
    <div>
      {articles ? 
        articles.map((article, i) => {
          return <Card 
                    key={i}
                    title={article.title} 
                    updated_at={article.updated_at} 
                    created_at={article.created_at}
                  />
        })
      : "No article found."}
    </div>
  </div>
}

export default Dashboard