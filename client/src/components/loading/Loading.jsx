import {CircularProgress} from '@mui/material'
import "./Loading.css"

const Loading = () => (
    <div className="container">
        <CircularProgress color="secondary" size='25vh' />
    </div>
);

export default Loading;
