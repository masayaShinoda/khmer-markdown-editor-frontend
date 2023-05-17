import { FunctionComponent } from "react"
import { Link } from "react-router-dom"

const NotFoundPage: FunctionComponent = () => {
    return <div>
        <p style={{fontSize: "2rem"}}>Error 404: page not found.</p>
        <Link to="/">← Back home</Link>
    </div>
}

export default NotFoundPage