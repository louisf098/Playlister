import { useContext } from "react";
import * as React from "react";
import { GlobalStoreContext } from "../store";
import AuthContext from "../auth";

import YouTubePlayerExample from "./PlaylisterYouTubePlayer";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function UserPlayerArea() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let playlistName = "";
    if (store.playingPlaylist !== null) {
        playlistName = store.playingPlaylist.name;
    }

    let songNum = "";
    let songTitle = "";
    let songArtist = "";
    if (store.playingSong !== null) {
        songNum = store.playingSongIndex;
        songTitle = store.playingSong.title;
        songArtist = store.playingSong.artist;
    }

    return (
        <Box sx={{ width: "100%" }}>
            <AppBar
                sx={{
                    position: "sticky",
                    fontFamily: "Lexend Exa",
                    bgcolor: "#e6e6e6",
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab label="Player" />
                    <Tab label="Comments" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <YouTubePlayerExample />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "25vh",
                        bgcolor: "#e6e6e6",
                        fontFamily: "'Merriweather', serif",
                        flexGrow: 1,
                    }}
                >
                    <Box sx={{ display: "flex", ml: "auto", mr: "auto" }}>
                        <Typography>Now Playing</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography>Playlist: {playlistName}</Typography>
                        <Typography>Song #: {songNum}</Typography>
                        <Typography>Title: {songTitle}</Typography>
                        <Typography>Artist: {songArtist}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            ml: "auto",
                            mr: "auto",
                            bgcolor: "#123456",
                            borderRadius: "25px",
                            padding: '0px 2px 0px 2px',
                        }}
                    >
                        <IconButton>
                            <SkipPreviousIcon sx={{fontSize: '25pt', color: 'white'}}/>
                        </IconButton>
                        <IconButton>
                            <StopIcon sx={{fontSize: '25pt', color: 'white'}}/>
                        </IconButton>
                        <IconButton>
                            <PlayArrowIcon sx={{fontSize: '25pt', color: 'white'}}/>
                        </IconButton>
                        <IconButton>
                            <SkipNextIcon sx={{fontSize: '25pt', color: 'white'}}/>
                        </IconButton>
                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box sx={{display: 'flex', flexDirection: 'column', fontFamily: "'Merriweather', serif" }}>
                    {/* Map through playlsits comments and create a list of list items for each comment */}
                </Box>
            </TabPanel>
        </Box>
    );
}

function TabPanel(props) {
    const { children, value, index } = props;

    return <Box>{value === index && <Box sx={{}}>{children}</Box>}</Box>;
}

export default UserPlayerArea;
