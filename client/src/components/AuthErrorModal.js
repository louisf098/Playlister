import AuthContext from "../auth";
import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { Stack } from '@mui/material'
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert' 

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 150,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    console.log(auth.errorMsg);

    function handleClose() {
        auth.deleteErrMsg();
    }

    return (
        <Modal
            open={auth.errorMsg !== ""}
        >
            <Box sx={style}>
                <Box component="div" className="modal is-visible" id="edit-song-modal" data-animation="slideInOutLeft"> 
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Alert severity="error" sx={{margin: "10px"}}>
                        <strong>{auth.errorMsg}</strong>
                        </Alert>                       
                        <Box>
                            <Button variant="contained" sx={{marginTop: "10px"}} onClick={handleClose}>CLOSE</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            
        </Modal>
    );
}