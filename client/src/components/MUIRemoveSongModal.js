import { useContext } from "react";
import GlobalStoreContext from "../store";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import { Button } from '@mui/material'


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function MUIRemoveSongModal() {
    const { store } = useContext(GlobalStoreContext);

    function handleConfirmRemoveSong() {
        store.addRemoveSongTransaction();
    }

    function handleCancelRemoveSong() {
        store.hideModals();
    }

    let modalClass = "modal";
    if (store.isRemoveSongModalOpen()) {
        modalClass += " is-visible";
    }
    let songTitle = "";
    if (store.currentSong) {
        songTitle = store.currentSong.title;
    }
    const song = store.currentSong;

    return (
        <Modal open={store.isRemoveSongModalOpen}>
            <Box sx={style}>
                <Box component="div" classname="modal-root" id='verify-remove-song-root'>
                    <Stack>
                        <Box sx={{textDecoration: 'underline', fontSize: '30px'}}>
                            Remove Song
                        </Box>
                        <br></br>
                        <Box sx={{fontSize: '20px'}}>
                            Are you sure you want to remove {song.title} from this playlist?
                        </Box>
                        <Box sx={{width: '350px'}}>
                            <Button variant="contained" sx={{marginLeft: '60px', marginTop: '20px'}} onClick={handleConfirmRemoveSong}>Confirm</Button>
                            <Button variant="contained" sx={{marginLeft: '60px', marginTop: '20px'}} onClick={handleCancelRemoveSong}>Cancel</Button>
                        </Box>
                    </Stack>
                </Box>
                
            </Box>
        </Modal>
    );
}
