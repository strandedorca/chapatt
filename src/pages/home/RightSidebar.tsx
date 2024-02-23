import { Box, styled } from "@mui/system"
import avatar from './../../assets/avatar.jpg';
import { Button, Divider, Typography } from "@mui/material";
import { Speaker } from "@mui/icons-material";
// import { Speaker } from "@material-ui/icons";

const RightSidebar = () => {
    const Avatar = styled('img')({
        width: "94px",
        height: "94px",
        borderRadius: "48px",
        position: "absolute",
        top: "100",
        translate: "15px -55%",
        border: "6px solid #222328"
    });
    const Section = styled(Box)({
        backgroundColor: "#111214", 
        color: "white",
        width: "100%",
        borderRadius: "8px",
        marginBottom: "15px",
    });
    const Content = styled('p')({
        margin: "0",
        fontSize: ".8em",
    })
    const Title = styled(Content)({
        textTransform: "uppercase",
        marginTop: "10px",
        fontWeight: "500"
    })
    const WhiteDivider = styled(Divider)({
        borderColor: "white",
        margin: "15px 0 10px"
    })

    return (
        <Box height="100%" position="relative" sx={{ backgroundColor: "#222328"}}>
            <Box id="banner" sx={{ 
                backgroundColor: "#d7c3bc", 
                height: "120px",
            }}>
            </Box>
            <Avatar src={avatar} />
            <Box paddingTop="60px" paddingX="15px">
                <Section paddingX="15px" paddingY="18px">
                    <Typography sx={{
                        fontSize: "1.1em",
                        fontWeight: "bold"
                    }}>Pikachu</Typography>
                    <Content>zippyzappy</Content>
                    <WhiteDivider />
                    <Title>About Me</Title>
                    <Content>😮</Content>
                    <Title>Discord Member Since</Title>
                    <Content>Mar 9, 2018</Content>
                    <WhiteDivider />
                    <Title>Note</Title>
                    <Content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, eligendi.</Content>
                </Section>
                <Section component={Button}>Buzz!</Section>
            </Box>
        </Box>
    )
}

export default RightSidebar