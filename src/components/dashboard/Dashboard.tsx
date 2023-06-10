import {
  FunctionComponent,
  useContext,
  useState,
  useEffect,
}
  from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import Row from "./Row"
import LoadingSpinner from "../utils/LoadingSpinner"
import styles from "./Dashboard.module.css"

const Dashboard: FunctionComponent = () => {
  const { user, accessToken } = useContext(UserContext)

  interface Article {
    key: number,
    slug: string,
    title: string,
    category_name: string,
    updated_at: string,
    created_at: string,
  }

  const [articles, setArticles] = useState<Array<Article> | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/articles/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      }
    )
      .then(res => {
        if (res.status === 200) {
          return res.json()
        }
      })
      .then(data => {
        if (data) {
          const articles: Array<Article> = Array.from(data)

          setArticles(articles.map((article: Article, index: number) => {
            return {
              key: index,
              slug: article.slug,
              title: article.title,
              category_name: article.category_name,
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

  return <>
    <div style={{ display: `flex`, justifyContent: `space-between`, alignItems: `center` }}>
      <h1>ទំព័រដើម</h1>
      {user ?
        <p>
          <i className="icon account" style={{ width: `.75rem`, height: `.75rem`, marginRight: `.5rem` }}></i>
          ឈ្មោះគណនី៖ <Link to="/account">{user.username}</Link>
        </p>
        : null}
    </div>
    <div className={styles.dashboard_container_controls}>
      <Link to="/editor/new" className="btn_main">
        <i className="icon add_document"></i>
        <span>
          បង្កើតអត្តបទថ្មី
        </span>
      </Link>
    </div>
    <div className={styles.dashboard_container}>
      <table className={styles.articles_table}>
        <thead>
          <tr>
            <td>ចំណងជើង</td>
            <td>ប្រភេទអត្តបទ</td>
            <td>កែប្រែចុងក្រោយ</td>
            <td>បង្កើតឡើង</td>
          </tr>
        </thead>
        <tbody>
          {
            articles ?
              articles.length > 0 ?
                articles.map((article, i) => {
                  return <Row
                    key={i}
                    slug={article.slug}
                    title={article.title}
                    updated_at={article.updated_at}
                    created_at={article.created_at}
                    category_name={article.category_name}
                  />
                })
                : <tr>
                  <td style={{padding: ".75rem .5rem"}}>
                    <span>មិនទាន់មានអត្តបទទេ។&nbsp;</span>
                    <Link to="/editor/new">
                      <span>បង្កើតអត្តបទថ្មី&nbsp;→</span>
                    </Link>
                  </td>
                </tr>
              : <tr>
                <td>
                  <LoadingSpinner />
                  <span style={{ marginLeft: ".75rem" }}>កំពុងទាញយកទិន្នន័យ...</span>
                </td>
              </tr>
          }
        </tbody>
      </table>
    </div>
  </>
}

export default Dashboard