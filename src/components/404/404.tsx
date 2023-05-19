import { FunctionComponent } from "react"
import { Link } from "react-router-dom"

const NotFoundPage: FunctionComponent = () => {
    return <div>
        <p style={{fontSize: "2rem"}}>បញ្ហាកូដ 404៖ ទំព័រនេះមិនមានទេ។</p>
        <Link to="/">← ទៅទំព័រដើម</Link>
    </div>
}

export default NotFoundPage