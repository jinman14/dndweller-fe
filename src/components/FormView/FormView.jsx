import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import './FormView.css'
import TokenGallery from '../TokenGallery/TokenGallery';
import GenderSelection from "../GenderSelection/GenderSelection";


function FormView() {
    const { state } = useLocation();

    // const selectedRace = state?.selectedRace;
    // const selectedClass = state?.selectedClass;
    const [selectedToken, setSelectedToken] = useState(null)
    const [selectedGender, setSelectedGender] = useState(null)
    const [availableStats, setAvailableStats] = useState([])
    const [selectedStats, setSelectedStats] = useState({})
    const [statPointsLeft, setStatPointsLeft] = useState(10)
    const BASE_STAT_VALUE = 8
    const MAX_STAT_POINTS_PER_STAT = 5
    const [confirmedStats, setConfirmedStats] = useState(false)
    const [availableSkills, setAvailableSkills] = useState([])
    const [selectedSkills, setSelectedSkills] = useState({})
    const [skillPointsLeft, setSkillPointsLeft] = useState(5)
    const MAX_POINTS_PER_SKILL = 3;

        useEffect(() => {
            if (!selectedToken) return
    
            fetch('/stats_data.json')
            .then((response) => response.json())
            .then((data) => {
                const classStats = data
                // console.log("Stats LOADED:", classStats)
                setAvailableStats(classStats || [])
            })
        }, [selectedToken])
    
        useEffect(() => {
            if(!selectedToken) return
    
            fetch('/skills_data.json')
            .then((response) => response.json())
            .then((data) => {
                const filteredSkills = data.filter((skill) => {
                    return skill.recommendedFor.includes(selectedToken.class)
                })
                setAvailableSkills(filteredSkills)
            })
        }, [selectedToken])
  
        return (
            <section>
                <div className='form-selection'>{/* Token */}
                    <TokenGallery onSelect={setSelectedToken} />
                </div>

                {selectedToken && (
                    <div>
                        <h3>Token Selected!</h3>
                        <div className="token-card confirmed-token">
                            <img src={selectedToken.url} alt="preview" style={{ width: '100px' }} />
                        </div>
                    </div>
                )}

                {selectedToken && (
                    <div className='form-selection'>{/* Gender */}
                        <GenderSelection onSelectGender={setSelectedGender} />
                    </div>
                )}

            {selectedGender && (
                <div className='form-selection'>{/* Stats */}
                    {availableStats.map((stat) => {
                        const assignedPoints = selectedStats[stat.name] || 0
                        return (
                            <div className="stat-card" key={stat.name}>
                                <h4>{stat.name} | {BASE_STAT_VALUE + assignedPoints}</h4>
                                <p>{stat.description}</p>
                                {!confirmedStats && (
                                  <p><strong>Recommended for:</strong> {stat.recommendedFor.join(", ")}</p>
                                )}
                            
                                {!confirmedStats && (
                                    <div className="stat-buttons">
                                        {/* - Button */}
                                        <button
                                            onClick={() => {
                                                if (assignedPoints > 0) {
                                                    setSelectedStats(previousState => ({
                                                        ...previousState,
                                                        [stat.name]: assignedPoints - 1
                                                    }))
                                                    setStatPointsLeft(previousState => previousState + 1)
                                                }
                                            }}
                                            disabled={assignedPoints === 0}
                                        >–</button>

                                        {/* + Button */}
                                        <button
                                            onClick={() => {
                                                if (statPointsLeft > 0 && assignedPoints < MAX_STAT_POINTS_PER_STAT) {
                                                    setSelectedStats(previousState => ({
                                                        ...previousState,
                                                        [stat.name]: assignedPoints + 1
                                                    }))
                                                    setStatPointsLeft(previousState => previousState - 1)
                                                }
                                            }}
                                            disabled={statPointsLeft === 0 || assignedPoints >= MAX_STAT_POINTS_PER_STAT}
                                        >+</button>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    
                    {!confirmedStats && (
                        <div>
                            <p>Points Remaining: {statPointsLeft}</p>
                            <button
                                className="confirm-button"
                                onClick={() => setConfirmedStats(true)}
                                disabled={statPointsLeft > 0}>
                                Confirm Choices
                            </button>
                        </div>
                    )}
                </div>
            )}

            {confirmedStats && (
                <div className='form-selection'>{/* Skills */}
                    {availableSkills.map(skill => {
                        const assignedSkillPoints = selectedSkills[skill.name] || 0
                        return (
                            <div key={skill.name} className="skill-card">
                                <h4>{skill.name} | {assignedSkillPoints}</h4>
                                <p>{skill.description}</p>
                                <div className="skill-buttons">
                                    {/* - Button */}
                                    <button
                                            onClick={() => {
                                                if (assignedSkillPoints > 0) {
                                                    setSelectedSkills(previousState => ({
                                                        ...previousState,
                                                        [skill.name]: assignedSkillPoints - 1
                                                    }))
                                                    setSkillPointsLeft(previousState => previousState + 1)
                                                }
                                            }}
                                            disabled={assignedSkillPoints === 0}
                                        >–</button>

                                        {/* + Button */}
                                        <button
                                            onClick={() => {
                                                if (skillPointsLeft > 0 && assignedSkillPoints < MAX_POINTS_PER_SKILL) {
                                                    setSelectedSkills(previousState => ({
                                                        ...previousState,
                                                        [skill.name]: assignedSkillPoints + 1
                                                    }))
                                                    setSkillPointsLeft(previousState => previousState - 1)
                                                }
                                            }}
                                            disabled={skillPointsLeft === 0 || assignedSkillPoints >= MAX_POINTS_PER_SKILL}
                                        >+</button>
                                </div>
                            </div>
                        )
                    })}

                    <p>Points Remaining: {skillPointsLeft}</p>
                    {skillPointsLeft === 0 && (
                        <Link
                            to="/form/customize"
                            state={{
                                selectedToken,
                                selectedGender,
                                selectedStats,
                                selectedSkills,
                            }}
                            className="form-customize-link"
                        >
                            <button className="confirm-button">
                                Move to Customization
                            </button>
                        </Link>
                    )}
                </div>
            )}
        </section>
    )
}

export default FormView;



