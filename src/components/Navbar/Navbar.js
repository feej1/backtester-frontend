import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import './Navbar.css'

function Navbar() {

    return (
        <nav className="navbar navbar-expand-md bg-body-secondary">
            <div className="container-md">
                <div className="navbar-brand"><a href="/" className="link-dark link-underline-opacity-0">AlgoTester</a></div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <div className="navbar-nav col-4">
                            <Link to="/" className="nav-item p-2 nav-link hover-link-blue">Home</Link>
                            <Link to="/Tool" className="nav-item p-2 nav-link hover-link-blue">Tool</Link>
                            {/* <Link to="/Guide" className="nav-item p-2 nav-link hover-link-blue">Guide</Link> */}
                            <Link to="/Contact" className="nav-item p-2 nav-link hover-link-blue">Contact</Link>
                    </div>
                    <div className="col col-8"></div>
                </div>
            </div>
        </nav>
    );
}


export default Navbar;