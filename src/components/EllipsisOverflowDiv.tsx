import { styled } from "@mui/system";
import { ReactElement } from "react"

interface EllipsisOverflowDivProp {
    children: any;
}

const EllipsisOverflowDiv = ({ children }: EllipsisOverflowDivProp) => {
  const EllipsisOverflowDiv = styled('div')({
    overflow: 'hidden', 
    textOverflow: 'ellipsis', 
    whiteSpace: 'nowrap' 
  })
  return <EllipsisOverflowDiv>{children}</EllipsisOverflowDiv>
}

export default EllipsisOverflowDiv