import { useContext, useState } from "react";
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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from '@mui/material/TextField';

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
    const [value, setValue] = useState(0);
    const [text, setText] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleEnter = (event) => {
        store.addComment(text);
        setText("");
    }

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

    let playerVisible = {
        display: true
    }
    if (value === 1) {
        playerVisible = {
            display: "none"
        }
    }

    let textFieldVisible = {
        display: true
    }
    if (store.playingPlaylist === null || !store.playingPlaylist.isPublished) {
        textFieldVisible = {
            display: 'none'
        }
    }
    if (auth.user.userName === "PLSNOFINDGUEST") {
        textFieldVisible = {
            display: 'none'
        }
    }

    let comments = "";
    if (store.playingPlaylist !== null && store.playingPlaylist.comments !== []) {
    comments =
        <Box sx={{maxHeight: '58vh', overflow: 'auto'}}>
            <List>
                {store.playingPlaylist.comments.map((comment) => (
                    <ListItem>
                        <Box sx={{bgcolor: '#8561c5', width: '36vw', border: '2px solid black', borderRadius: '8px', padding: '5px'}}>
                            <Typography sx={{fontSize: '15px', color: '#002884'}}>
                                {comment.userName}
                            </Typography>
                            <Typography sx={{fontSize: '18px'}}>
                                {comment.text}
                            </Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    }

    return (
        <Box sx={{ width: "100%"}}>
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
            <Box sx={playerVisible}>
                <YouTubePlayerExample />
            </Box>
            <TabPanel value={value} index={0}>

            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box sx={{display: 'flex', flexDirection: 'column', fontFamily: "'Merriweather', serif", bgcolor: '#D3D3D3', maxHeight: '66vh', height: '66vh'}}>
                    {/* Map through playlsits comments and create a list of list items for each comment */}
                    <Box sx={{flexGrow: 1}}>
                        { comments }
                    </Box>
                    <TextField id="filled-basic" label="Add Comment" variant="filled" 
                        onKeyPress={(ev) => {
                            console.log(`Pressed keyCode ${ev.key}`);
                            if (ev.key === 'Enter') {
                                handleEnter();
                                ev.preventDefault();
                            }
                            }}
                        value={text}
                        onChange={(ev) => {
                            setText(ev.target.value);
                        }}
                        sx={textFieldVisible}
                    />
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
