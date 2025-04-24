import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import './FormView.css'
import TokenGallery from '../TokenGallery/TokenGallery';
import GenderSelection from "../GenderSelection/GenderSelection";


function FormView() {
    const { state } = useLocation();

    const selectedRace = state?.selectedRace;
    const selectedClass = state?.selectedClass;
    const [selectedToken, setSelectedToken] = useState(null)
    const [selectedGender, setSelectedGender] = useState(null)
    const [availableStats, setAvailableStats] = useState([])
    const [selectedStats, setSelectedStats] = useState({})
    const [statPointsLeft, setStatPointsLeft] = useState(27)

    const BASE_STAT_VALUE = 8
    const MAX_STAT_POINTS_PER_STAT = 7
    // const MAX_POINTS_PER_SKILL = 3

    const [confirmedStats, setConfirmedStats] = useState(false)
    const [availableSkills, setAvailableSkills] = useState([])
    const [selectedSkills, setSelectedSkills] = useState({})
    const [selectedLanguages, setSelectedLanguages] = useState([])

        useEffect(() => {
            if (!selectedClass) return
    
            fetch('/stats_data.json')
            .then((response) => response.json())
            .then((data) => {
                const classStats = data
                setAvailableStats(classStats || [])
            })
        }, [selectedClass])
    
        useEffect(() => {
            if(!selectedClass) return
    
            fetch('/skills_data.json')
            .then((response) => response.json())
            .then((data) => {
                const filteredSkills = data.filter((skill) => {
                    return skill.recommendedFor.includes(selectedClass)
                })
                setAvailableSkills(filteredSkills)
            })
        }, [selectedClass])

        useEffect(() => {
            if (!selectedRace) return
          
            fetch('/languages_data.json')
              .then((response) => response.json())
              .then((data) => {
                const raceLangs = data[selectedRace] || []
                setSelectedLanguages(raceLangs)
              })
        }, [selectedRace])
  
        let statModifiers = {};

            if (confirmedStats) {
                for (const [statName, points] of Object.entries(selectedStats)) {
                    const total = BASE_STAT_VALUE + points;
                    statModifiers[statName.toLowerCase()] = Math.floor((total - 10) / 2);
                }
            }

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

            {selectedToken && selectedGender && selectedClass && (
                <div className='form-selection'>{/* Stats */}
                    {availableStats.map((stat) => {
                        const assignedPoints = selectedStats[stat.name] || 0
                        
                        return (
                            <div className="stat-card" key={stat.name}>
                                <h4>{stat.name} | {BASE_STAT_VALUE + assignedPoints}
                                    {confirmedStats && (
                                        <> (mod: {Math.floor((BASE_STAT_VALUE + assignedPoints - 10) / 2) >= 0 ? "+" : ""}
                                        {Math.floor((BASE_STAT_VALUE + assignedPoints - 10) / 2)})</>
                                    )}
                                </h4>
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
                                                    if ((assignedPoints) > 5)
                                                        setStatPointsLeft(previousState => previousState + 2)
                                                    else
                                                        setStatPointsLeft(previousState => previousState +1)
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
                                                        [stat.name]: assignedPoints + 1,
                                                    }))
                                                    // console.log(assignedPoints)
                                                    if ((assignedPoints) >= 5)
                                                        setStatPointsLeft(previousState => previousState - 2)
                                                    else
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
                        const relatedStat = skill.statDependency
                        const baseMod = statModifiers[relatedStat] || -1
                        const skillBonus = baseMod + assignedSkillPoints
                        const formattedBonus = skillBonus >= -1 ? `${skillBonus}` : `${skillBonus}`

                        // Count currently selected proficiencies
                        const selectedCount = Object.values(selectedSkills).filter(val => val === 2).length;

                        return (
                            <div key={skill.name} className="skill-card">
                                <h4>{skill.name} | {assignedSkillPoints}</h4>
                                <p>{skill.description}</p>
                                <p>Skill Bonus: {formattedBonus}</p>
                                <div className="skill-checkbox">
                                    {/* check box */}
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={assignedSkillPoints >= 2}
                                            disabled={
                                                !assignedSkillPoints &&
                                                selectedCount >= 3
                                            }
                                            onChange={(event) => {
                                                const isSelected = event.target.checked;
                                                setSelectedSkills(prev => ({
                                                    ...prev,
                                                    [skill.name]: isSelected ? 2 : 0
                                                }));
                                            }}
                                        />
                                        +2 (proficiencyBonus)
                                    </label>
                                </div>
                            </div>
                        )
                    })}
                    
                        <Link
                            to="/form/customize"
                            state={{
                                selectedToken,
                                selectedGender,
                                selectedStats,
                                selectedSkills,
                                selectedClass,
                                selectedRace,
                                selectedLanguages
                            }}
                            className="form-customize-link"
                        >
                            <button className="confirm-button">
                                Move to Customization
                            </button>
                        </Link>
                </div>
            )}
        </section>
    )
}

export default FormView;
