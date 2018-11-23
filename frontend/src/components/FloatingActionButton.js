import React from 'react';
import Fab from '@material/react-fab'
import '@material/react-fab/dist/fab.css';
import '../App.css';
import { Link } from 'react-router-dom';
     
 class FloatingActionButton extends React.Component {
    
    render() {
        return(
            <div>
                <Link to ='/post' >
                <Fab className="app-fab" icon={<span className="material-icons">+</span>}/>
                </Link>
            </div>    
        )
    }
}

export default FloatingActionButton
    