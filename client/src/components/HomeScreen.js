import React, { useContext, useEffect } from "react";
import { GlobalStoreContext } from "../store";
import ListCard from "./ListCard.js";
import AppHeading from "./AppHeading";
import UserPlayerArea from "./UserPlayerArea";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.setAllPlaylists();
        store.loadIdNamePairs();
    }, []);

    useEffect(() => {
        store.loadIdNamePairs();
    }, [store.newListCounter]);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = (
            <List
                sx={{ bgcolor: "background.paper", width: "90%", left: "5%" }}
            >
                {store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))}
            </List>
        );
    }
    return (
        <Box>
            <div>
                {/* <div id="list-selector-heading" style={{backgroundColor: "#2c387e"}}>
                <Fab 
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                    <Typography variant="h2">Your Lists</Typography>
                </div> */}
                <AppHeading />
                <div
                    id="list-selector-list"
                    style={{ width: "50%", float: "left" }}
                >
                    {listCard}
                </div>
            </div>

            <div
                style={{
                    float: "right",
                    width: "50%",
                    height: "72vh",
                    backgroundColor: "#e6e6e6",
                }}
            >
                <UserPlayerArea />
            </div>
        </Box>
    );
};

export default HomeScreen;
