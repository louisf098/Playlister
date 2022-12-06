import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import EditToolbar from './EditToolbar'

import { styled, alpha } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { sizing } from '@mui/system';
import InputBase from '@mui/material/InputBase';

import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [text, setText] = useState("");
    const isMenuOpen = Boolean(anchorEl);

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.setCurrentlySearching(text.toLowerCase());
        }
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        store.resetCurrentList();
        auth.logoutUser();
    }

    const handleClearTps = () => {
        store.clearTransactions();
    }

    const testing = () => {
        console.log("hi");
    }

    const handleOpenSort = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSortByName = () => {
        store.setSortType("NAME");
        handleMenuClose();
    }

    const handleSortByCreationDate = () => {
        store.setSortType("CREATION_DATE");
        handleMenuClose();
    }

    const handleSortByLastEditDate = () => {
        store.setSortType("LAST_EDIT_DATE");
        handleMenuClose();
    }

    const handleSetScreenAllLists = () => {
        store.setCurrentScreen("ALL_LISTS");
    }

    const handleSetScreenHome = () => {
        store.setCurrentScreen("HOME");
    }

    const handleSetScreenUser = () => {
        store.setCurrentScreen("USER_LISTS");
    }

    let menuItems = "";
    if (store.currentScreen === "NONE" || store.currentScreen === "HOME") {
        menuItems =
        <Box>
            <MenuItem onClick={handleSortByCreationDate}>Creation Date (Old - New)</MenuItem>
            <MenuItem onClick={handleSortByLastEditDate}>Last Edit Date (New - Old)</MenuItem>
            <MenuItem onClick={handleSortByName}>Name (A-Z)</MenuItem>
        </Box>
    }
    else {
        menuItems =
        <Box>
            <MenuItem onClick={handleSortByName}>Name (A-Z)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Listens (High - Low)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Likes (High - Low)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Dislikes (High - Low)</MenuItem>
        </Box>
    }

    let homeStyles = "";
    let groupStyles = "";
    let userStyles = "";
    if (store.currentScreen === "HOME" || store.currentScreen === "NONE") {
        homeStyles = {border: '2px solid black'}
    }
    if (store.currentScreen === "ALL_LISTS") {
        groupStyles = {border: '2px solid black'}
    }
    if (store.currentScreen === "USER_LISTS") {
        userStyles = {border: '2px solid black'}
    }


    return (
       <Box>
            <AppBar position="static" sx={{bgcolor: "#3f51b5"}}>
                <Toolbar>
                    <Box>
                        <IconButton onClick={handleSetScreenHome} sx={homeStyles}>
                            <HomeIcon sx={{fontSize: "22pt", color: "white"}}></HomeIcon>
                        </IconButton>
                        <IconButton onClick={handleSetScreenAllLists} sx={groupStyles}>
                            <GroupsIcon sx={{fontSize: "22pt", color: "white"}}></GroupsIcon>
                        </IconButton>
                        <IconButton onClick={handleSetScreenUser} sx={userStyles}>
                            <PersonIcon sx={{fontSize: "22pt", color: "white"}}></PersonIcon>
                        </IconButton>
                    </Box>

                    <Box sx={{ml: "auto", mr: "auto", width: 'auto'}}>
                        <TextField
                            onKeyPress={handleKeyPress}
                            onChange={handleUpdateText}
                            sx={{width: '38vw', ml: '4vw', bgcolor: 'white'}}
                            placeholder={"Search"}
                        />
                    </Box>

                    <Box sx={{display: 'flex', ml: "auto"}}>
                        <Typography sx={{mt: 1}}>Sort By</Typography>
                        <IconButton onClick={handleOpenSort}>
                            <SortIcon sx={{color: "white"}}></SortIcon>
                        </IconButton>
                    </Box>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                    >   
                        {menuItems}

                    </Menu>
                </Toolbar>
            </AppBar> 

            
       </Box>
    );
}