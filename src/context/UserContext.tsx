import { ReactNode, SetStateAction, createContext, useEffect, useState } from "react"
import check_token from "../utils/check_token"

export interface User {
    username: string,
}

export const UserContext = createContext<string | SetStateAction<User> | SetStateAction<string> | SetStateAction<any> | object | null>(null)

interface UserProviderProps {
    children: ReactNode,
}

export const UserProvider = (props: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [contextData, setContextData] = useState({})

    // check localstorage for access token
    useEffect(() => {
        const stored_access_token = localStorage.getItem("access_token")
        if(stored_access_token) {
            setAccessToken(stored_access_token)
        }
    }, [])

    useEffect(() => {
        if(accessToken) {
            //  react to an update in access token, check if it's still valid
            check_token(accessToken)
                .then(response => {
                    if(response.user_id) {
                        // token is still valid
                        setUser({
                            username: response.username,
                        })
                    } else {
                        // token is no longer valid
                        setAccessToken(null)
                        setUser(null)
                        localStorage.removeItem("access_token")
                        // react router will handle redirect to '/login'
                    }
                })
        }
    }, [accessToken])

    useEffect(() => {
        setContextData({
            user: user,
            accessToken: accessToken,
            setUser: setUser,
            setAccessToken: setAccessToken,
        })
    }, [user, accessToken])

    return (
        <UserContext.Provider value={contextData}>
            {props.children}
        </UserContext.Provider>
    )
}