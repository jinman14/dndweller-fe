import React, { useState } from "react"
import { Link, useLocation } from 'react-router-dom'
import './FormView.css'

function FormView() {
    const location = useLocation()
    const { selectedRace, selectedClass } = location.state || {};
  
    return (
        <section className='form-container'>  
            <div className='form-selection'>
                <label htmlFor="class-select">Class</label> {/* Class */}
                <select
                    id="class-select"
                    value={selectedClass}
                    onChange={(event) => setSelectedClass(event.target.value)}>
                        <option value=""> -- Select a Class -- </option>
                        <option value="Fighter"> Fighter </option>
                        <option value="Rogue"> Rogue </option>
                        <option value="Cleric"> Cleric </option>
                        <option value="Bard"> Bard </option>
                        <option value="Wizard"> Wizard </option>
                    </select>
                </div> 

            <div className='form-selection'></div> {/* Race */}
            <div className='form-selection'></div> {/* Gender */}
            <div className='form-selection'></div> {/* Skills */}
            <div className='form-selection'></div> {/* Spells */}
            <div className='form-selection'></div> {/* Token */}
            <div className='form-selection'></div> {/* Name */}
            <div className='form-selection submit-button'></div> {/* Submit */}
        </section>
    )
}

export default FormView