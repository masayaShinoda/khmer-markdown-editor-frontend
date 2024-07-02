import { FunctionComponent, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import AccountDetails from "./AccountDetails";

const Account: FunctionComponent = () => {
    const context = useContext(UserContext);

    return <>
        {context?.user && <AccountDetails user={context.user} />}
    </>;
}

export default Account;
