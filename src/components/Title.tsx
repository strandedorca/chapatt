import { styled } from "@mui/system"

const TitleComponent = styled('p')({
    textTransform: "uppercase",
    marginTop: "10px",
    margin: "0",
    fontSize: ".8em",
})

const Title = ({ content }: any) => {
  return (
    <TitleComponent>{content}</TitleComponent>
  )
}

export default Title