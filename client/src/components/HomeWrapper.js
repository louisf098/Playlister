import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import Box from "@mui/material/Box";
import MUIDeleteModal from './MUIDeleteModal'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.loggedIn)
        return (
            <Box>
                <HomeScreen />
                <MUIDeleteModal />
                <MUIRemoveSongModal />
                <MUIEditSongModal />
            </Box>
        )
    else
        return <SplashScreen />
}