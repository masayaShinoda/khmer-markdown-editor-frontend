import { SetStateAction, createContext } from "react"

interface User {
    username: string,
}

export const UserContext = createContext<User | SetStateAction<any> | null>(null)
