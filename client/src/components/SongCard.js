import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

import Box from '@mui/material/Box';

import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';


function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index, isPublished } = props;

    function handleDragStart(event) {
        if (!isPublished) {
            event.dataTransfer.setData("song", index);
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        if (!isPublished) {
            setDraggedTo(true);
        }
    }

    function handleDragLeave(event) {
        event.preventDefault();
        if (!isPublished) {   
            setDraggedTo(false);
        }
    }

    function handleDrop(event) {
        event.preventDefault();
        if (!isPublished) {
            let targetIndex = index;
            let sourceIndex = Number(event.dataTransfer.getData("song"));
            setDraggedTo(false);
            // UPDATE THE LIST
            if (targetIndex !== sourceIndex)
                store.addMoveSongTransaction(sourceIndex, targetIndex);
        }

    }
    function handleRemoveSong(event) {
        event.stopPropagation();
        store.showRemoveSongModal(index, song);
    }
    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        event.stopPropagation();
        if (event.detail === 2 && !isPublished) {
            store.showEditSongModal(index, song);
        }
    }

    let isDraggable = "true";
    if (isPublished) isDraggable = "false";

    let removeSongButton = "";
    if (!isPublished) {
        removeSongButton =
            <IconButton onClick={(event) => {handleRemoveSong(event)}} sx={{float: "right", zIndex: '6'}}>
                <ClearIcon sx={{size: "medium", color: "grey"}}></ClearIcon>
            </IconButton>
    }
    else {
        removeSongButton = <Box></Box>
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable={isDraggable}
            onClick={(event) => {
                handleClick(event);
            }}
            style={{display: "flex", justifyContent: 'space-between'}}
        >   <Box>
                {index + 1}.

                {song.title} by {song.artist}
        
            </Box>
            {removeSongButton}
        </div>
    );
}

export default SongCard;