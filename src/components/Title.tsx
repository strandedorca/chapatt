import { styled } from "@mui/system"

const TitleComponent = styled('p')({
  textTransform: "uppercase",
  marginTop: "10px",
  margin: "0",
  fontSize: ".8em",
  fontWeight: "500"
})

interface TitleProp {
  content: string
}

const Title = ({ content }: TitleProp) => {
  return (
    <TitleComponent>{content}</TitleComponent>
  )
}

export default Title