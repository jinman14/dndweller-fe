import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './RaceClassView.css'

const classes = ["Fighter", "Rogue", "Cleric", "Wizard", "Bard"]
const races = ["Human", "Elf", "Half-Elf", "Dwarf", "Halfling", "Gnome", "Half-Orc", "Tiefling", "Dragonborn"]

const RaceClassView = () => {

    const [selectedRace, setSelectedRace] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);

    return (
        <div className="raceclass-container">
            <h2>Choose A Class:</h2>
                <div className="class-buttons">
                    {classes.map((cls) => (
                        <button 
                        key = {cls}
                        className={`option-button ${selectedClass === cls ? 'selected' : ''}`}
                        onClick={() => setSelectedClass(cls)}
                        >
                        {cls}
                        </button>
                    ))}
                </div>
            <h2>Choose A Race:</h2>
                <div className="race-buttons">
                    {races.map((race) => (
                        <button 
                        key = {race}
                        className={`option-button ${selectedRace === race ? 'selected' : ''}`}
                        onClick={() => setSelectedRace(race)}
                        >
                        {race}
                        </button>
                    ))}
                </div>

            {selectedRace && selectedClass && 
            (<Link 
                to="/form" 
                state={{ selectedRace, selectedClass }}
                className="form-link"
            >
                Fill Out Your Dweller's Details
            </Link>
            )}
        </div>
    )
}

export default RaceClassView;