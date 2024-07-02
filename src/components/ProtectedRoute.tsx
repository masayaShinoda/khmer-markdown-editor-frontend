import { ReactNode, FunctionComponent, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = (props: ProtectedRouteProps) => {
    const context = useContext(UserContext);

    return (
        context?.user && context?.accessToken ? <>{props.children}</> : <Navigate to={"/login"} state={{message: "សូមចូលទៅកាន់គណនីលោកអ្នកដើម្បីបន្ត។"}} />
    );
};

export default ProtectedRoute;
