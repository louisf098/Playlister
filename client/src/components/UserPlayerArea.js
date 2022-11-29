import { useContext } from 'react'
import * as React from 'react';
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography } from '@mui/material'
import Box from '@mui/material/Box';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function UserPlayerArea() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
        
    return (
        <Box sx={{ width: '100%' }}>
            <AppBar sx={{position: "sticky", fontFamily: "Lexend Exa", bgcolor: "#e6e6e6"}}>
                <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                >
                    <Tab label="Player" />
                    <Tab label="Comments" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                Item 1 Detail
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item 2 Detail
            </TabPanel>
        </Box>

    );
}

function TabPanel(props) {
    const {children, value, index} = props;
    
    return (
        <Box>
            {
                value===index && (
                    <Box>{children}</Box>
                )
            }
        </Box>
    )

}

export default UserPlayerArea;