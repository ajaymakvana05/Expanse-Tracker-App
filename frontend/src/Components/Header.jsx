import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [loginUser, setLoginUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setLoginUser(user);
        }
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem('user');
        setLoginUser(null); // Reset the user state
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">
                    <Link to="/" className="navbar-brand fw-bold fs-4 text-light">Expanse Management</Link>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/user" className="nav-link text-light">
                                {loginUser ? loginUser.username : 'Guest'}
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                    {loginUser ? (
                        <button className="btn btn-primary px-2 ms-2" style={{ borderRadius: "60px", border: "1px solid white", }} onClick={handleLogOut}>
                            Log Out
                        </button>
                    ) : (
                        <Link to="/login" className="btn btn-primary p-2 rounded ">
                            Log In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
