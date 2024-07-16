import React from 'react';

const Navbar = ({ toggleSidebar }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" onClick={toggleSidebar}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#">Your Brand</a>
            </div>
        </nav>
    );
};

export default Navbar;
