import * as React from 'react';
import { Box, List, ListItem, ListItemText, Divider, Typography, styled } from '@mui/material';

const Setting = () => {
    const [selectedTab, setSelectedTab] = React.useState('My Account');

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, newValue: React.SetStateAction<string>) => {
        setSelectedTab(newValue);
    };

    const settings = {
        'USER SETTINGS': ['My Account', 'Profiles', 'Privacy & Safety', 'Family Centre', 'Authorised Apps', 'Devices', 'Connections', 'Clips', 'Friend Requests'],
        'APP SETTINGS': ['Appearance', 'Accessibility', 'Voice & Video', 'Chat', 'Notifications', 'Keybinds', 'Language', 'Streamer Mode', 'Advanced']
    };
    const CustomScrollbar = styled(Box)`
    width: 450px;
    height: 100vh;
    background-color: #2b2d31;
    color: #b5bac1;
    border-right: 1px solid #ccc;
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    padding-left: 14rem;
    padding-top: 4rem;

    &:hover {
        overflow: auto;
        scrollbar-width: thin;
        scrollbar-color: #000 #2b2d31;

        &::-webkit-scrollbar {
            width: 4px;
        }
    }

    scrollbar-width: none; /* For Firefox */
    &::-webkit-scrollbar {
        display: none; /* For Chrome, Safari, and Opera */
    }
`;


    return (

        <CustomScrollbar>
            <List component="nav" sx={{ maxWidth: 200 }}>
                {Object.entries(settings).map(([category, items]) => (
                    <React.Fragment key={category}>
                        <ListItem sx={{ padding: 2 }}>
                            <Typography variant="h6" sx={{ fontSize: 12, fontWeight: 'bold', color: '#949ba4' }}>
                                {category}
                            </Typography>
                        </ListItem>
                        {items.map(text => (
                            <ListItem
                                button
                                key={text}
                                selected={selectedTab === text}
                                onClick={(event) => handleListItemClick(event, text)}
                                sx={{
                                    padding: 0,
                                    paddingLeft: 2,
                                    bgcolor: selectedTab === text ? '#404249' : 'inherit',
                                    borderRadius: '4px',
                                    mb: '2px',
                                    '&:hover': {
                                        bgcolor: '#35373c',
                                    },
                                    '&.Mui-selected': {
                                        bgcolor: '#404249',
                                        color: '#ffffff',
                                        '&:hover': {
                                            bgcolor: '#35373c',
                                        },
                                    },
                                }}
                            >
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                        <Divider sx={{ my: 1, bgcolor: '#3b3d44' }} />
                    </React.Fragment>
                ))}
            </List>
        </CustomScrollbar>
    );
};

export default Setting;