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
  const { user } = useContext(UserContext)


  interface Article {
    key: number,
    id: number,
    title: string,
    updated_at: string,
    created_at: string,
  }

  const [articles, setArticles] = useState<Array<Article>>([])

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "token 279a8ec9dc96240e20c597733007bcc0bb30a727"
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        if(data) {
          setArticles(data.map((article: Article, index: number) => {
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
  }, [])

  return <div>
    <h1>Dashboard</h1>
    {user ? <p>Welcome {user.username}</p> : null}
    
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