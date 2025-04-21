import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

const LandingPage = () => {
    return (
        <div className="landing-container">
            <h2>Welcome to the Dungeon's Newest Dweller!</h2>
            <p className="about-text">
                Click the button below to start creating a character!
            </p>
            <Link to="/form" className="form-link">
                Create Your Dungeon Dweller
            </Link>
        </div>
    )
}

export default LandingPage;