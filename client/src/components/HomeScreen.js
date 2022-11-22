import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import YouTubePlayerExample from './PlaylisterYouTubePlayer';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (

        <Box sx={{bgcolor: 'red'}}>
        
            <div>
                <div id="list-selector-heading">
                <Fab 
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                    <Typography variant="h2">Your Lists</Typography>
                </div>
                <div id="list-selector-list" style={{width: '50%', float: 'left'}}>
                    {
                        listCard
                    }
                    <MUIDeleteModal />
                </div>
            </div>
            
            <div style={{float: 'right', width: '50%'}}>
                <YouTubePlayerExample />
            </div>

        </Box>

        )
}

export default HomeScreen;