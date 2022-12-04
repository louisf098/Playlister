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
const AllListsScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    useEffect(() => {
        store.loadIdNamePairs();
    }, [store.newListCounter]);

    console.log(store.idNamePairs);
    console.log(store.allPlaylists);

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
                    backgroundColor: "red",
                }}
            >
                <UserPlayerArea />
            </div>
        </Box>
    );
};

export default AllListsScreen;
