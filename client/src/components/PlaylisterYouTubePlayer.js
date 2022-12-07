import React from 'react';
import { useContext, useState, useEffect } from "react";
import { GlobalStoreContext } from "../store";
import YouTube from 'react-youtube';

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
import { getPlaylists } from '../store/store-request-api';

export default function YouTubePlayerExample() {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT
    const { store } = useContext(GlobalStoreContext);

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    const[playlist, setPlaylist] = useState([]);
    const[player, setPlayer] = useState("");

    useEffect(()=> {
        if (store.playingPlaylist !== null) {
           let arr = store.playingPlaylist.songs.map(song => song.youTubeId);
           setPlaylist(arr);
        }
    }, [store.playingPlaylist]);

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST

    const playerOptions = {
        height: '288',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[store.playingSongIndex];
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong(play) {
        let num = store.playingSongIndex + 1;
        num = num % playlist.length;
        store.incrementSongIndex(num);
        loadAndPlayCurrentSong(play);
    }

    function onPlayerReady(event) {
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    function handlePrevSong(event) {
        let num = store.playingSongIndex - 1;
        if (num < 0) num = playlist.length - 1;
        store.incrementSongIndex(num);
        loadAndPlayCurrentSong(player);
    }

    function handleSkipSong(event) {
        let num = store.playingSongIndex + 1;
        if (num === playlist.length) num = 0;
        store.incrementSongIndex(num);
        loadAndPlayCurrentSong(player);
    }

    function handlePause() {
        player.pauseVideo();
    }

    function handlePlay() {
        player.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let play = event.target;
        setPlayer(event.target);
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
            event.target.playVideo();
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong(play);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }
    

    let songNum = "";
    let songTitle = "";
    let songArtist = "";
    let playingSong = "";
    if (store.playingPlaylist !== null && store.playingPlaylist.songs.length > 0) {
        playingSong = store.playingPlaylist.songs[store.playingSongIndex];
        songNum = store.playingSongIndex;
        songTitle = playingSong.title;
        songArtist = playingSong.artist;
    }

    let playlistName = "";
    if (store.playingPlaylist !== null) {
        playlistName = store.playingPlaylist.name;
    }
    // if (store.playingSong !== null) {
    //     songNum = store.playingSongIndex;
    //     songTitle = store.playingSong.title;
    //     songArtist = store.playingSong.artist;
    // }

    return (
        <Box>
            <YouTube
            videoId={playlist[store.playingSongIndex]}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange} />
            <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "25vh",
                        bgcolor: '#D3D3D3',
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
                        <IconButton onClick={handlePrevSong}>
                            <SkipPreviousIcon sx={{fontSize: '25pt', color: 'white'}}/>
                        </IconButton>
                        <IconButton onClick={handlePause}>
                            <StopIcon sx={{fontSize: '25pt', color: 'white'}}/>
                        </IconButton>
                        <IconButton onClick={handlePlay}>
                            <PlayArrowIcon sx={{fontSize: '25pt', color: 'white'}}/>
                        </IconButton>
                        <IconButton onClick={handleSkipSong}>
                            <SkipNextIcon sx={{fontSize: '25pt', color: 'white'}}/>
                        </IconButton>
                    </Box>
                </Box>
        </Box>
    )
}