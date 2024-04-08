import classes from '../UI/sidebar.module.css'
import {Link} from 'react-router-dom'
export default function SideBar(){
    return (<div className={classes.maindiv}>
        <div className={classes.linkdiv}>
            <Link className={classes.link} to='/CardForm'>New Card</Link>
        </div>
        <div className={classes.linkdiv}>
            <Link className={classes.link} to='/Cards'>Your cards</Link>
        </div>
    </div>
        
    );
}