import { NavLink } from "react-router-dom"
import CustomTooltip from "../../../components/CustomTooltip"
import ServerButton from "../../../components/ServerButton"

interface ServerNavigationItemProps {
    id: string,
    photoURL?: string | null,
    name: string,
}

const ServerNavigationItem = ({ id, photoURL, name }: ServerNavigationItemProps) => {
    return (
        <CustomTooltip title={name}>
            {/* NavLink to personal conversations / a group */}
            <NavLink
                to={id === "me" ? 'me' : `servers/${id}`}
                style={{ textDecoration: "none" }}
            >
                <ServerButton photoURL={photoURL}>
                    <div>{name[0].toUpperCase()}</div>
                </ServerButton>
            </NavLink>
        </CustomTooltip>
    )
}

export default ServerNavigationItem