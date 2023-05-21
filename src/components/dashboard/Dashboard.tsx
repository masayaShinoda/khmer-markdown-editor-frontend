import { 
  FunctionComponent,
  useContext,
  useState,
  useEffect,
} 
from "react"
import { Link } from "react-router-dom"
import Row from "./Row"
import { UserContext } from "../../context/UserContext"
import styles from "./Dashboard.module.css"

const Dashboard: FunctionComponent = () => {
  const { user, accessToken } = useContext(UserContext)

  interface Article {
    key: number,
    id: number,
    title: string,
    category: string,
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
      .then(res => {
        if(res.status === 200) {
          return res.json()
        }
      })
      .then(data => {
        if(data) {
          const articles: Array<Article> = Array.from(data)
          
          setArticles(articles.map((article: Article, index: number) => {
              return {
                key: index,
                id: article.id,
                title: article.title,
                category: article.category,
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
    {user ? 
      <p>
        <i className="icon account" style={{width: `.75rem`, height: `.75rem`, marginRight: `.5rem`}}></i>
        ឈ្មោះគណនី៖ <Link to="/account">{user.username}</Link>
      </p> 
    : null}
    
    <div className={styles.dashboard_container}>
      <table className={styles.articles_table}>
        <thead>
          <tr>
            <td>ចំណងជើង</td>
            <td>ប្រភេទ</td>
            <td>កែប្រែចុងក្រោយ</td>
            <td>បង្កើតឡើង</td>
          </tr>
        </thead>
        <tbody>
          {articles.length > 0 ? 
            articles.map((article, i) => {
              return <Row 
                        key={i}
                        title={article.title} 
                        updated_at={article.updated_at} 
                        created_at={article.created_at}
                        category={article.category}
                      />
            })
          : <tr style={{padding: `1rem 0`}}>
              <td>
                <Link to="/editor" className="utils type_scale_2">សរសេរអត្តបទថ្មី →</Link>
              </td>
          </tr> 
          }
        </tbody>
      </table>
    </div>
  </div>
}

export default Dashboard