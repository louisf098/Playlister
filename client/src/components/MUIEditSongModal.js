import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { Stack } from '@mui/material'
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    height: 330,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [ title, setTitle ] = useState(store.currentSong.title);
    const [ artist, setArtist ] = useState(store.currentSong.artist);
    const [ youTubeId, setYouTubeId ] = useState(store.currentSong.youTubeId);

    function handleConfirmEditSong() {
        let newSongData = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);        
    }

    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        setTitle(event.target.value);
    }

    function handleUpdateArtist(event) {
        setArtist(event.target.value);
    }

    function handleUpdateYouTubeId(event) {
        setYouTubeId(event.target.value);
    }

    return (
        <Modal
            open={store.isEditSongModalOpen()}
        >
            <Box sx={style}>
                <Box component="div" className="modal is-visible" id="edit-song-modal" data-animation="slideInOutLeft"> 
                    <Stack>
                        <Box sx={{fontSize: '35px', textDecoration: 'underline'}}>Edit Song</Box>
                        <br></br>
                        <Box sx={{fontSize: '30px'}}>Title:</Box>
                        <TextField id="outlined-basic" variant="outlined"
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }} defaultValue={title}/>
                        <Box sx={{fontSize: '30px'}}>Artist:</Box>
                        <TextField id="outlined-basic" variant="outlined" 
                        onChange={(event) => {
                            setArtist(event.target.value);
                        }} defaultValue={artist}/>
                        <Box sx={{fontSize: '30px'}}>YouTube Id:</Box>
                        <TextField id="outlined-basic" variant="outlined" 
                        onChange={(event) => {
                            setYouTubeId(event.target.value);
                        }} defaultValue={youTubeId}/>
                        <Box sx={{width: '350px'}}>
                            <Button variant="contained" sx={{marginLeft: '50px', marginTop: '10px'}} onClick={handleConfirmEditSong}>Confirm</Button>
                            <Button variant="contained" sx={{marginLeft: '50px', marginTop: '10px'}} onClick={handleCancelEditSong}>Cancel</Button>
                        </Box>
                    </Stack>
                </Box>
            </Box>
            
        </Modal>
    );
}