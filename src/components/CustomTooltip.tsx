import { Tooltip } from "@mui/material"

interface CustomTooltipProp {
    children: React.ReactElement,
    title: string,
}

const CustomTooltip = ({ children, title }: CustomTooltipProp) => {
  return (
    <Tooltip title={title} arrow placement="right">
        {children}
    </Tooltip>
  )
}

export default CustomTooltip