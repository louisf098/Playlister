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
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

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

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        marginLeft: '75px',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: 'auto',
        },
      }));

      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '500px',
          },
        },
      }));

      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));

    const handleOpenSort = (event) => {
        setAnchorEl(event.currentTarget);
    };


    return (
       <Box>
            <AppBar position="static">
                <Toolbar>
                    <Box>
                        <IconButton onClick={testing}>
                            <HomeIcon></HomeIcon>
                        </IconButton>
                        <IconButton>
                            <GroupsIcon></GroupsIcon>
                        </IconButton>
                        <IconButton>
                            <PersonIcon></PersonIcon>
                        </IconButton>
                    </Box>

                    <Box sx={{ml: "auto", mr: "auto", width: 'auto'}}>
                        <Search>
                            <SearchIconWrapper>
                            <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Box>

                    <Box sx={{display: 'flex', ml: "auto"}}>
                        <Typography sx={{mt: 1}}>Sort By</Typography>
                        <IconButton onClick={handleOpenSort}>
                            <MenuIcon></MenuIcon>
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
                        <MenuItem onClick={handleMenuClose}>Sort By</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Sort By</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Sort By</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar> 

            
       </Box>
    );
}