import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import SongCard from './SongCard';

import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { flexbox } from '@mui/system';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import { Icon, Typography } from '@mui/material';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleSelect(event, id) {
        if (store.currentList === null) {
            store.setCurrentList(id);
        }
        else if (store.currentList.name === idNamePair.name) {
            store.resetCurrentList();
        }
        else {
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let songBox = "";

    if (store.currentList !== null && idNamePair.name === store.currentList.name) {
        songBox = 
            <Box sx={{maxWidth: "32vw", width: "100%"}}>
                <List sx={{alignItems: "center"}}>
                    {
                        store.currentList.songs.map((song, index) => (
                            <ListItem sx={{maxWidth: "32vw", width: "100%"}}>
                                <SongCard
                                    id={'playlist-song-' + (index)}
                                    key={'playlist-song-' + (index)}
                                    index={index}
                                    song={song}
                                />
                            </ListItem>
                        ))  
                    }
                    <ListItem sx={{
                        justifyContent: "center",
                    }}>
                        <Button variant="contained" sx={{
                            width: "100%",
                            fontSize: "18pt",
                            padding: "10px",
                            borderRadius: "25px",
                            bgcolor: "#ede7f6",
                            color: "black",
                            "&.MuiButton-contained": { backgroundColor: "ede7f6" },
                            '&:hover': {
                                backgroundColor: '#111111',
                                color: 'white',
                            },
                        }}>
                            +
                        </Button> 
                    </ListItem>
                </List>

            </Box>
    }
    else {
        songBox =
            <Box></Box>
    }
    
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '10px', display: 'grid'}}
            style={{ width: '100%', fontSize: '30pt' }}
            // button
            // onClick={(event) => {
            //     handleLoadList(event, idNamePair._id)
            // }}
        >
            <Box sx={{display: 'flex', width: '32vw', justifyContent: 'space-between'}}>
                <Box>{idNamePair.name}</Box>
                <Box sx={{display: 'flex'}}>
                    <Box>
                        <IconButton onClick={handleToggleEdit} aria-label='edit'>
                            <ThumbUpOffAltIcon style={{fontSize:'22pt'}} />
                        </IconButton>
                    </Box>
                    <Box>
                        <IconButton onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} aria-label='delete'>
                            <ThumbDownOffAltIcon style={{fontSize:'22pt'}} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            {songBox}

            <Box sx={{display: 'flex'}}>
                <Typography>By: Louis Feng</Typography>
            </Box>

            <Box sx={{display: 'flex', width: '32vw', justifyContent: 'space-between'}}>
                <Typography sx={{color: 'green'}}>Published: </Typography>
                <Typography sx={{color: 'red'}}>Listens: </Typography>
                <IconButton onClick={(event) => {
                    handleSelect(event, idNamePair._id);
                }}> 
                    <KeyboardDoubleArrowDownIcon style={{fontSize:'22pt'}}></KeyboardDoubleArrowDownIcon>
                </IconButton>
            </Box>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;