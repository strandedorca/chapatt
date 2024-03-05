import { styled } from "@mui/system";
import { ReactNode } from "react"

interface EllipsisOverflowDivProp {
  children: ReactNode;
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