import { useContext, useState, useEffect } from 'react'
import HomeScreen from './HomeScreen'
import Box from "@mui/material/Box";
import MUIDeleteModal from './MUIDeleteModal'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import { GlobalStoreContext } from "../store";
import AllListsScreen from './AllListsScreen';
import UserListsScreen from './UserListsScreen';

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [screen, setScreen] = useState(<HomeScreen />);
    
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);

    useEffect(() => {
        if (store.currentScreen === "NONE" || store.currentScreen === "HOME") {
            setScreen(<HomeScreen />);
        }
        else if (store.currentScreen === "ALL_LISTS") {
            setScreen(<AllListsScreen />)
        }
        else if (store.currentScreen === "USER_LISTS") {
            setScreen(<UserListsScreen />)
        }
    }, [store.currentScreen])
    
    if (auth.loggedIn)
        return (
            <Box>
                {screen}
                <MUIDeleteModal />
                <MUIRemoveSongModal />
                <MUIEditSongModal />
            </Box>
        )
    else
        return <SplashScreen />
}