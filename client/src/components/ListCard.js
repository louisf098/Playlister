import { useContext, useState, useEffect } from "react";
import { GlobalStoreContext } from "../store";
import AuthContext from "../auth";
import SongCard from "./SongCard";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    const [expanded, setExpanded] = useState(false);
    const [clicked, setClicked] = useState(false);

    // gets corresponding playlist object
    let playlist = null;
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);
    playlist = store.allPlaylists.filter(function (list) {
        return list._id === idNamePair._id;
    });
    playlist = playlist[0];

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf("list-card-text-") >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleSelect(event, id) {
        event.stopPropagation();
        if (store.currentList === null) {
            //load in
            store.setCurrentList(id);
        } else if (store.currentList.name !== idNamePair.name) {
            //select another list while one list is open
            store.setCurrentList(id);
        } else {
            //close same list
            store.resetCurrentList();
            setExpanded(false);
        }
    }

    function handlePlay(event, id) {
        console.log(id);
        event.stopPropagation();
        if (store.playingPlaylist === null) {
            //load in
            store.setPlayingList(id);
        } else if (store.playingPlaylist.name !== idNamePair.name) {
            //select another list while one list is open
            store.setPlayingList(id);
        } else {
            //close same list
            store.resetPlayingList();
            setClicked(false);
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
    function handleAddNewSong(event) {
        event.stopPropagation();
        store.addNewSong();
    }
    function handleUndo(event) {
        event.stopPropagation();
        store.undo();
    }
    function handleRedo(event) {
        event.stopPropagation();
        store.redo();
    }
    function handlePublish(event, id) {
        event.stopPropagation();
        store.publishPlaylist(id);
    }
    function handleChangeListName(event) {
        event.stopPropagation();
        if (!playlist.isPublished) {
            if (event.detail === 2) {
                toggleEdit();
            }
        }
    }

    function handleEventStopPropagation(event) {
        event.stopPropagation();
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let expandButton = "";
    if (expanded === false) {
        expandButton = (
            <KeyboardDoubleArrowDownIcon
                style={{ fontSize: "22pt" }}
            ></KeyboardDoubleArrowDownIcon>
        );
    } else {
        expandButton = (
            <KeyboardDoubleArrowUpIcon
                style={{ fontSize: "22pt" }}
            ></KeyboardDoubleArrowUpIcon>
        );
    }

    let workspaceButtons = "";
    let workspaceButtonStyles = {
        "&.MuiButton-contained": {
            backgroundColor: "#2c387e",
        },
        fontSize: "10px",
        margin: "1px",
    };

    let addSongButton = "";
    let undoRedoButtons = "";
    let publishButton = "";
    if (playlist !== undefined && !playlist.isPublished) {
        addSongButton =
            <Button
                variant="contained"
                sx={{
                    width: "100%",
                    fontSize: "18pt",
                    padding: "10px",
                    borderRadius: "25px",
                    bgcolor: "#ede7f6",
                    color: "black",
                    "&.MuiButton-contained": {
                        backgroundColor: "ede7f6",
                    },
                    "&:hover": {
                        backgroundColor: "#111111",
                        color: "white",
                    },
                }}
                onClick={(event) => {
                    handleAddNewSong(event)
                }}
            >
                +
            </Button>

        undoRedoButtons =
            <Box>
                <Button
                    onClick={(event) => {
                        handleUndo(event)
                    }}
                    variant="contained"
                    sx={workspaceButtonStyles}
                >
                    Undo
                </Button>
                <Button
                    onClick={(event) => {
                        handleRedo(event)
                    }}
                    variant="contained"
                    sx={workspaceButtonStyles}
                >
                    Redo
                </Button>
            </Box>

        publishButton =
        <Button onClick={(event) => {handlePublish(event, idNamePair._id)}} variant="contained" sx={workspaceButtonStyles}>
            Publish
        </Button>
    }
    else {
        addSongButton = <Box></Box>
        undoRedoButtons = <Box></Box>
        publishButton = <Box></Box>
    }

    let deleteButton = "";
    if (auth.user.userName === playlist.userName) {
        deleteButton =
        <Button
            onClick={(event) => {
                handleDeleteList(event, idNamePair._id);
            }}
            variant="contained"
            sx={workspaceButtonStyles}
        >
            Delete
        </Button>
    }
    else {
        deleteButton = <Box></Box>
    }

    if (expanded) {
        workspaceButtons = (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {undoRedoButtons}
                <Box>
                    {publishButton}
                    {deleteButton}
                    <Button variant="contained" sx={workspaceButtonStyles}>
                        Duplicate
                    </Button>
                </Box>
            </Box>
        );
    } else {
        workspaceButtons = <Box></Box>;
    }
    
    let songBox = "";

    if (
        store.currentList !== null &&
        idNamePair._id === store.currentList._id
    ) {
        songBox = (
            <Box sx={{ maxWidth: "32vw", width: "100%" }}>
                <List sx={{ alignItems: "center" }}>
                    {store.currentList.songs.map((song, index) => (
                        <ListItem sx={{ maxWidth: "32vw", width: "100%" }}>
                            <SongCard
                                id={"playlist-song-" + index}
                                key={"playlist-song-" + index}
                                index={index}
                                song={song}
                                isPublished={playlist.isPublished}
                            />
                        </ListItem>
                    ))}
                    <ListItem
                        sx={{
                            justifyContent: "center",
                        }}
                    >
                        {addSongButton}
                    </ListItem>
                </List>
            </Box>
        );
    } else {
        songBox = <Box></Box>;
    }
    
    let publishedBy = "";
    if (playlist !== undefined) {
        publishedBy = playlist.userName;
    }

    let listCardStyles = { marginTop: "10px", display: "grid", width: "100%", fontSize: "30pt", cursor: "pointer"};
    if (clicked) {
        listCardStyles = { marginTop: "10px", display: "grid", width: "100%", fontSize: "30pt", cursor: "pointer", bgcolor: '#8561c5'};
    }

    useEffect(() => {
        if (store.currentList !== null ) {
            setExpanded(idNamePair._id === store.currentList._id);
        }
    }, [store.currentList]);

    useEffect(() => {
        if (store.playingPlaylist !== null ) {
            setClicked(idNamePair._id === store.playingPlaylist._id);
        }
    }, [store.playingPlaylist]);

    useEffect(() => {
        if (store.publishCounter !== -1) {
            store.setAllPlaylists();
        }
    }, [store.publishCounter])
    
    let likeAndDislike = "";
    let publishedAndListens = "";
    if (playlist !== undefined && playlist.isPublished) {
        publishedAndListens =
            <Box sx={{display: 'flex', flexGrow: 1, justifyContent: 'space-between', mr: '10px'}}>
                <Typography sx={{ color: "#1b5e20" }}>Published: {playlist!==undefined && playlist.isPublished ? playlist.publishedAt : ""}</Typography>
                <Typography sx={{ color: "red" }}>Listens: </Typography>
            </Box>

        likeAndDislike =
            <Box sx={{ display: "flex" }}>
                <Box>
                    <IconButton
                        aria-label="edit"
                    >
                        <ThumbUpOffAltIcon style={{ fontSize: "22pt" }} />
                    </IconButton>
                </Box>
                <Box>
                    <IconButton
                        onClick={(event) => {
                            handleDeleteList(event, idNamePair._id);
                        }}
                        aria-label="delete"
                    >
                        <ThumbDownOffAltIcon style={{ fontSize: "22pt" }} />
                    </IconButton>
                </Box>
            </Box>

    }
    else {
        publishedAndListens = <Box></Box>
    }

    let cardElement = (
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={listCardStyles}
            onClick={(event) => {
                handlePlay(event, idNamePair._id);
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: '100%',
                    maxWidth: '100%',
                    flexDirection: 'row',
                }}
            >
                <Box sx={{ fontSize: '80%' }} onClick={handleChangeListName}>{idNamePair.name}</Box>
                {likeAndDislike}
            </Box>

            {songBox}

            {workspaceButtons}

            <Box sx={{ display: "flex" }}>
                <Typography>By: {publishedBy}</Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    width: "32vw",
                    justifyContent: "space-between",
                }}
            >
                {publishedAndListens}
                <IconButton
                    onClick={(event) => {
                        handleSelect(event, idNamePair._id);
                    }}
                >
                    {expandButton}
                </IconButton>
            </Box>
        </ListItem>
    );

    if (editActive) {
        cardElement = (
            <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={listCardStyles}
            onClick={(event) => {
                handlePlay(event, idNamePair._id);
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: '100%',
                    maxWidth: '100%',
                    flexDirection: 'row',
                }}
            >
                <Box sx={{ fontSize: '80%' }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id={"list-" + idNamePair._id}
                    label="Playlist Name"
                    name="name"
                    autoComplete="Playlist Name"
                    className="list-card"
                    onKeyPress={handleKeyPress}
                    onChange={handleUpdateText}
                    onClick={handleEventStopPropagation}
                    defaultValue={idNamePair.name}
                    inputProps={{ style: { fontSize: 22 } }}
                    InputLabelProps={{ style: { fontSize: 17 } }}
                    autoFocus
                />
                </Box>
                {likeAndDislike}
            </Box>

            {songBox}

            {workspaceButtons}

            <Box sx={{ display: "flex" }}>
                <Typography>By: {publishedBy}</Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    width: "32vw",
                    justifyContent: "space-between",
                }}
            >
                {publishedAndListens}
                <IconButton
                    onClick={(event) => {
                        handleSelect(event, idNamePair._id);
                    }}
                >
                    {expandButton}
                </IconButton>
            </Box>
        </ListItem>
        );
    }
    
    return cardElement;
}

export default ListCard;
