import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';

import { Typography } from '@mui/material'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab'

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    function handleCreateNewList() {
        store.createNewList();
    }

    let text ="";
    if (store.currentList)
        text = store.currentList.name;

    let statusBar = "";
    if (auth.loggedIn) {
        console.log("hi");
        statusBar =
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
        
    }
    else {
        statusBar = <Box></Box>
    }
        

    return (
        <div>
            {statusBar}
        </div>
    );
}

export default Statusbar;