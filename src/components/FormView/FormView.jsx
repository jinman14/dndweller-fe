import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './FormView.css'

const FormView = () => {
    const location = useLocation()
    const { selectedRace, selectedClass } = location.state || {};

    return (
        <div className="landing-container">
            <p className="about-text">
                Here's what we know about your dweller so far:
            </p>
            <p>Race: {selectedRace}</p>
            <p>Class: {selectedClass}</p>
            <Link to="/sheet" className="sheet-link">
                Generate Your Dungeon Dweller
            </Link>
        </div>
    )
}

export default FormView;