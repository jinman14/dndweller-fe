import React from 'react'
import { Link } from 'react-router-dom'
import './FormView.css'

const FormView = () => {
    return (
        <div className="landing-container">
            <p className="about-text">
                Fill in your character's details below:
            </p>
            <Link to="/sheet" className="sheet-link">
                Generate Your Dungeon Dweller
            </Link>
        </div>
    )
}

export default FormView;