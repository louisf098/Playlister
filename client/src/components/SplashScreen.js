import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export default function SplashScreen() {

    function handleLogin() {

    }
    
    let buttonStyles = {
        "&.MuiButton-contained": {
            backgroundImage: "linear-gradient(to bottom, #24125b, purple)",
        },
        padding: '15px',
        width: '115px',
        height: '80px',
        fontFamily: "'Merriweather', serif"
    };

    return (
        <Box id="splash-screen" sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={1}
                sx={{ alignContent: "center", justifyContent: "center" }}
            >
                <Grid item xs={12}>
                    <Typography
                        sx={{
                            fontFamily: "'Satisfy', cursive",
                            fontSize: "6vw",
                        }}
                    >
                        Playlister
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            fontSize: "2vw",
                            fontStyle: "italic",
                            textDecoration: "underline",
                        }}
                    >
                        Welcome to Playlister!
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{ fontFamily: "'Merriweather', serif" }}>
                        Create, edit, and play your very own playlists through
                        playlister! Tired of your own songs? Search for your
                        favorite playlists created by other users!
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{p: "2%"}}></Box>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <Button variant="contained" sx={buttonStyles} href="/login/">
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" sx={buttonStyles} href="/register/">
                            Create Account
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" sx={buttonStyles}>
                            Login as Guest
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
