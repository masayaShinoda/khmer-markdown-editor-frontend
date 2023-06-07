// utility component for loading spinner
import { FunctionComponent } from "react"

interface Props {
    theme?: "dark" | "primary",
}

const LoadingSpinner: FunctionComponent<Props> = (props: Props) => {

    return <div className={`lds-ring ${props.theme ? props.theme : ""}`}><div></div><div></div><div></div><div></div></div>
}

export default LoadingSpinner