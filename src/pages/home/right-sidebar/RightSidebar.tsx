import { Box, styled } from "@mui/system"
import avatar from './../../../assets/avatar.jpg';
import { Button, Divider, Typography } from "@mui/material";
import Title from "../../../components/Title";
import Avatar from '@mui/material/Avatar';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux-slices/currentUserSlice";

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

    // Get currentUser state
    const user = useSelector(selectCurrentUser);
    
    // Styled components
    const Section = styled(Box)(({ theme } ) => ({
        width: "100%",
        borderRadius: "8px",
        marginBottom: "15px",
        backgroundColor: theme.palette.background.paper,
    }));
    const Content = styled('p')({
        margin: "0",
        fontSize: ".8em",
    })
    const WhiteDivider = styled(Divider)({
        borderColor: "white",
        margin: "15px 0"
    })

    return (
        <Box height="100%" position="relative" 
        >
            {/* Banner */}
            <Box id="banner" sx={{ 
                backgroundColor: user.bannerColor, 
                height: 120,
            }}>
            </Box>

            {/* Avatar */}
            <Box sx={{
                position: "absolute",
                top: "100px", 
                transform: "translate(15px, -40%)", 
            }}>
                <Avatar 
                    src={user.photoURL} 
                    sx={{ width: 94, height: 94 }} 
                >
                    {/* {user.displayName[0]} */}
                </Avatar>
            </Box>

            <Box paddingTop="60px" paddingX="15px">
                {/* Information */}
                <Section paddingX="15px" paddingY="18px">
                    <Typography sx={{
                        fontSize: "1.1em",
                        fontWeight: "bold"
                    }}>
                        {user.displayName}
                    </Typography>
                    <Content>
                        // TO BE ADDED
                        {user.displayName}
                    </Content>

                    <WhiteDivider />

                    {!isServer ? (
                        <>
                            <Title content="About Me" />
                            <Content>{user.aboutMe}</Content>
                            <WhiteDivider />
                        </>
                    ) : ( null )}

                    <Title content="Since"/>
                    <Content>
                        {user.createdAt}
                    </Content>

                    <WhiteDivider />
                    
                    // TO BE IMPLEMENTED
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