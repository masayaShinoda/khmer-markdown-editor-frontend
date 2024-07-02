import { ReactNode, createContext, useEffect, useState } from "react";
import check_token from "../utils/check_token";

export interface User {
    username: string,
}

export interface UserContextType {
    user: User | null;
    accessToken: string | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
    children: ReactNode,
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    // Check local storage for access token
    useEffect(() => {
        const stored_access_token = localStorage.getItem("access_token");
        if (stored_access_token) {
            setAccessToken(stored_access_token);
            // console.log("Access token found in localStorage:", stored_access_token);
        }
    }, []);

    // Validate the token
    useEffect(() => {
        if (accessToken) {
            check_token(accessToken)
                .then(response => {
                    if (response.user_id) {
                        setUser({
                            username: response.username,
                        });
                        console.log("Token is valid. User set:", response.username);
                    } else {
                        setAccessToken(null);
                        setUser(null);
                        localStorage.removeItem("access_token");
                        console.log("Token is invalid. Access token and user cleared.");
                    }
                })
                .catch(err => {
                    console.error("Token validation error:", err);
                    setAccessToken(null);
                    setUser(null);
                    localStorage.removeItem("access_token");
                });
        }
    }, [accessToken]);

    const contextValue: UserContextType = {
        user,
        accessToken,
        setUser,
        setAccessToken
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
