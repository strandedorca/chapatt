import { NavLink } from "react-router-dom"
import CustomTooltip from "../../components/CustomTooltip"
import ServerButton from "../../components/ServerButton"

interface ServerNavigationItemProps {
    id: string,
    imgUrl: string,
    name: string,
}

const ServerNavigationItem = ({ id, imgUrl, name }: ServerNavigationItemProps) => {
    return (
        <CustomTooltip title={name}>
            <NavLink to={id}>
                <ServerButton imgUrl={imgUrl}>
                    <p>{name[0]}</p>
                </ServerButton>
            </NavLink>
        </CustomTooltip>
    )
}

export default ServerNavigationItem