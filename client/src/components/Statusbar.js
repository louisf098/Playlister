import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'

import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton';

import AddIcon from '@mui/icons-material/Add';
/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleCreateNewList() {
        store.createNewList();
    }

    let text ="";
    if (store.currentList)
        text = store.currentList.name;
    return (
        <div id="playlister-statusbar">
            {/* <Typography variant="h4">{text}</Typography> */}
            
            <IconButton 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon sx={{ fontSize: "35pt", color: "black"}}/>
            </IconButton>
                <Typography variant="h2">Your Lists</Typography>
            
        </div>
    );
}

export default Statusbar;