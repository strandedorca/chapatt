import { Tooltip } from "@mui/material"

interface CustomTooltipProp {
    children: React.ReactElement,
    title: string,
}

const CustomTooltip = ({ children, title }: CustomTooltipProp) => {
  return (
    <Tooltip title={title} arrow placement="right" >
      <div>
        {children}
      </div>
    </Tooltip>
  )
}

export default CustomTooltip