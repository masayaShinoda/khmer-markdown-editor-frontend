import { FunctionComponent, useContext } from "react"
import { UserContext } from "../../context/UserContext"
import AccountDetails from "./AccountDetails"

const Account: FunctionComponent = () => {
    const { user } = useContext(UserContext)

    return <>
        <AccountDetails user={user} />
    </>
}

export default Account