import Header from "./UI/Header";
import SideBar from "./UI/SideBar";
import classes from "../src/App.module.css";
import {Outlet} from 'react-router-dom'
export default function Router() {
    return (
        <>
        <Header/>
        <main>
            <SideBar/>
            <section style={{ border: "1px solid #F7F2EF", height:'100%', borderRadius:'15px', backgroundColor:'#FAC7C3'}}>
                <Outlet/> 
                {/* outlet are the childrens to display */}
            {/* Display Cards form  */}
            {/* or display Cards compoenent */}
            </section>
        </main>
        </>
    );
}
