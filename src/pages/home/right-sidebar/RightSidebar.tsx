import { Box, styled } from "@mui/system"
import avatar from './../../../assets/avatar.jpg';
import { Button, Divider, Typography } from "@mui/material";
import Title from "../../../components/Title";
import Avatar from "../../../components/Avatar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const RightSidebar = () => {
    // Show different UI for me/server page
    const [isServer, setIsServer] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname !== '/me') {
            setIsServer(true);
        } else {
            setIsServer(false);
        }
    }, [location.pathname])
    
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
    const WhiteDivider = styled(Divider)({
        borderColor: "white",
        margin: "15px 0 10px"
    })

    return (
        <Box height="100%" position="relative" 
            sx={{ backgroundColor: "#222328"}}
        >
            {/* Banner */}
            <Box id="banner" sx={{ 
                backgroundColor: "#d7c3bc", 
                height: "120px",
            }}>
            </Box>

            {/* Avatar */}
            <Box sx={{
                position: "absolute",
                top: "100px", 
                transform: "translate(15px, -40%)", 
                padding: "0",
            }}>
                <Avatar imgUrl={avatar} size={94} unit="px" />
            </Box>

            <Box paddingTop="60px" paddingX="15px">
                {/* Info */}
                <Section paddingX="15px" paddingY="18px">
                    <Typography sx={{
                        fontSize: "1.1em",
                        fontWeight: "bold"
                    }}>Pikachu</Typography>
                    <Content>zippyzappy</Content>
                    <WhiteDivider />
                    {!isServer ? (
                        <>
                            <Title content="About Me" />
                            <Content>😮</Content>
                            <WhiteDivider />
                        </>
                    ) : ( null )
                    }
                    <Title content="Since"/>
                    <Content>Mar 9, 2018</Content>
                    <WhiteDivider />
                    <Title content="Note" />
                    <Content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, eligendi.</Content>
                </Section>

                {/* Buttons */}
                {isServer ? (
                    <Section component={Button}>Show Members</Section>
                ) : ( null )}
                <Section component={Button}>Files Shared</Section>
            </Box>
        </Box>
    )
}

export default RightSidebar