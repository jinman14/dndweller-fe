import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <h1 className="title">The Dungeon's Newest Dweller</h1>
            <nav className="nav-bard">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/vault" className="nav-link">Character Vault</NavLink>
                <NavLink to="/resources" className="nav-link">Other Resources</NavLink>
            </nav>
        </header>
    )
}

export default Header;