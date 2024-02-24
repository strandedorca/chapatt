import { NavLink } from "react-router-dom"
import CustomTooltip from "../../../components/CustomTooltip"
import ServerButton from "../../../components/ServerButton"

interface ServerNavigationItemProps {
    id: string,
    imgUrl?: string | null,
    name: string,
}

const ServerNavigationItem = ({ id, imgUrl, name }: ServerNavigationItemProps) => {
    return (
        <CustomTooltip title={name}>
            <NavLink to={id} style={{ textDecoration: "none" }}>
                <ServerButton imgUrl={imgUrl}>
                    <div>{name[0]}</div>
                </ServerButton>
            </NavLink>
        </CustomTooltip>
    )
}

export default ServerNavigationItem