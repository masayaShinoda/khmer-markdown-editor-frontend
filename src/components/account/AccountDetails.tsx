import { FunctionComponent, useContext } from "react"
import { UserContext } from "../../context/UserContext"

interface Props {
    user: {
        username: string,
    }
}

const AccountDetails: FunctionComponent<Props> = (props: Props) => {
    const { setUser } = useContext(UserContext)

    function handleSignOut() {
        setUser(null)
    }

    return <div>
        <h3>Account details</h3>
        <h5>{props.user.username}</h5>

        <button
            className="btn_main"
            aria-label="Sign out"
            onClick={handleSignOut}
        >
            Sign out
        </button>
    </div>
}

export default AccountDetails