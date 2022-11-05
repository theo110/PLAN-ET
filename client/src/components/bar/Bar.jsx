import { Typography, Button, Toolbar, AppBar } from '@mui/material';

const Bar = () => {
    return (
        <div>
            <AppBar position="absolute" color="primary">
                <Toolbar>
                    <Typography>Name of Project</Typography>
                    <Button>Login/Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Bar;