import { Nav } from "./components";
import { Footer } from "./components/home";
import { Outlet } from "react-router-dom";

export default function Layout(){
    return (
        <div>
            <Nav />
            <Outlet />
            <Footer />
        </div>
    );
}