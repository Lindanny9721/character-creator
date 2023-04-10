import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="nav-container">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/Create">Create</Link>
                <Link to="/Gallery">Gallery</Link>
            </nav>
        </div>
    );
};

export default Navbar;

