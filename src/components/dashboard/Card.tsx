import { FunctionComponent } from "react"

interface Props {
    title: string,
    updated_at: string,
    created_at: string,
}

const Card: FunctionComponent<Props> = (props: Props) => {

    return <div>
        <h3>{props.title}</h3>
        <span>
            Last modified: <time>{new Date(props.updated_at).toDateString()} at {new Date(props.updated_at).toLocaleTimeString()}</time>
        </span>
        <span>
            Date created: <time>{new Date(props.created_at).toDateString()} at {new Date(props.created_at).toLocaleTimeString()}</time>
        </span>

    </div>
}

export default Card