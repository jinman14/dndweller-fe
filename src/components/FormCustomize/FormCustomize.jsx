import { useEffect, useState } from "react";
import TokenGallery from '../TokenGallery/TokenGallery';
import GenderSelection from "../GenderSelection/GenderSelection";

function FormCustomize() {
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
    const [confirmedSkill, setConfirmedSkill] = useState(false)
    const [availableCantrips, setAvailableCantrips] = useState([])
    const [selectedCantrips, setSelectedCantrips] = useState([])
    const [confirmedCantrips, setConfirmedCantrips] = useState(false);
    const [selectedLevel1Spells, setSelectedLevel1Spells] = useState([])
    const [availableLevel1Spells, setAvailableLevel1Spells] = useState([])
    const [confirmedLevel1Spells, setConfirmedLevel1Spells] =useState(false)
    const [selectedLevel2Spells, setSelectedLevel2Spells] = useState([])
    const [availableLevel2Spells, setAvailableLevel2Spells] = useState([])
    const [confirmedLevel2Spells, setConfirmedLevel2Spells] =useState(false)
    const [availableWeapons, setAvailableWeapons] = useState([])
    const [availableArmor, setAvailableArmor] = useState([])
    const [selectedWeapon, setSelectedWeapon] = useState(null)
    const [confirmedWeapon, setConfirmedWeapon] = useState(false)
    const [selectedArmor, setSelectedArmor] = useState(null)
    const [confirmedArmor, setConfirmedArmor] = useState(false)

    

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
            // console.log("Skills loaded:", data);
            // console.log("Selected token class:", selectedToken.class);

            const filteredSkills = data.filter((skill) => {
                return skill.recommendedFor.includes(selectedToken.class)
            })
            setAvailableSkills(filteredSkills)
        })
    }, [selectedToken])

    useEffect(() => {
        if(!selectedToken) return

        fetch('/spells_n_cantrips_data.json')
        .then((response) => response.json())
        .then((data) => {
            // console.log("Selected class:", selectedToken.class)
            // console.log("Available cantrips before filter:", data.cantrips)
            const filterCantrips = data.cantrips.filter((cantrip) => {
                return cantrip.recommendedFor.includes(selectedToken.class)
            })
            const filterLevel1Spells = data.spells_level_1.filter((level1) => {
                return level1.recommendedFor.includes(selectedToken.class)
            })
            const filterLevel2Spells = data.spells_level_2.filter((level2) => {
                return level2.recommendedFor.includes(selectedToken.class)
            })
            // console.log("Level 1 Spells:", filterLevel1Spells)
            // console.log("Level 2 Spells:", filterLevel2Spells)
            setAvailableCantrips(filterCantrips)
            setAvailableLevel1Spells(filterLevel1Spells)
            setAvailableLevel2Spells(filterLevel2Spells)
        })
    }, [selectedToken])

    useEffect(() => {
        if (!selectedToken) return

        fetch('/weapons_n_armor.json')
        .then((response) => response.json())
        .then((data) => {
            const filteredWeapons = data.weapons.filter((weapon) => {
                return weapon.recommendedFor.includes(selectedToken.class)
            })
            const filteredArmor = data.armor.filter((armor) => {
                return armor.recommendedFor.includes(selectedToken.class)
            })
            setAvailableWeapons(filteredWeapons)
            setAvailableArmor(filteredArmor)
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
                    <p>{selectedToken.race} {selectedToken.class}</p>
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

            {confirmedWeapon && (
                <div className="confirmed-gear">
                    <p><strong>Weapon:</strong> {selectedWeapon}</p>
                </div>
            )}

            {confirmedArmor && (
                <div className="confirmed-gear">
                    <p><strong>Armor:</strong> {selectedArmor}</p>
                </div>
            )}

            {confirmedCantrips && (
            <div className="confirmed-summary">
                <h4>Cantrips Chosen:</h4>
                <ul>
                {selectedCantrips.map(cantrip => (
                    <li key={cantrip}>{cantrip}</li>
                ))}
                </ul>
            </div>
            )}

            {confirmedLevel1Spells && (
            <div className="confirmed-summary">
                <h4>Level 1 Spells:</h4>
                <ul>
                {selectedLevel1Spells.map(spell => (
                    <li key={spell}>{spell}</li>
                ))}
                </ul>
            </div>
            )}

            {confirmedLevel2Spells && (
            <div className="confirmed-summary">
                <h4>Level 2 Spells:</h4>
                <ul>
                {selectedLevel2Spells.map(spell => (
                    <li key={spell}>{spell}</li>
                ))}
                </ul>
            </div>
            )}  


            {selectedGender && !confirmedWeapon && (
            <div className='form-selection'>{/* Weapons */}
                <h3>Select Your Weapon</h3>
                {availableWeapons.map(weapon => {
                const isSelected = selectedWeapon === weapon.name

                return (
                    <div key={weapon.name} className={`weapon-card ${isSelected ? 'selected' : ''}`}>
                    <h4>{weapon.name}</h4>
                    <p><strong>Range:</strong> {weapon.range}</p>
                    <p>{weapon.description}</p>
                    <button onClick={() => {
                        if (isSelected) {
                        setSelectedWeapon(null)
                        } else {
                        setSelectedWeapon(weapon.name)
                        }
                    }}>
                        {isSelected ? 'Unselect' : 'Select'}
                    </button>
                    </div>
                )
                })}
                <button
                className="confirm-button"
                onClick={() => setConfirmedWeapon(true)}
                disabled={!selectedWeapon}
                >
                Confirm Weapon
                </button>
            </div>
            )}

            {confirmedWeapon && !confirmedArmor && (
                <div className='form-selection'>{/* Armor */}
                    <h3>Select Your Armor</h3>
                    {availableArmor.map(armor => {
                    const isSelected = selectedArmor === armor.name

                    return (
                        <div key={armor.name} className={`armor-card ${isSelected ? 'selected' : ''}`}>
                        <h4>{armor.name}</h4>
                        <p>{armor.description}</p>
                        <button onClick={() => {
                            if (isSelected) {
                            setSelectedArmor(null)
                            } else {
                            setSelectedArmor(armor.name)
                            }
                        }}>
                            {isSelected ? 'Unselect' : 'Select'}
                        </button>
                        </div>
                    )
                    })}
                    <button
                    className="confirm-button"
                    onClick={() => setConfirmedArmor(true)}
                    disabled={!selectedArmor}
                    >
                    Confirm Armor
                    </button>
                </div>
            )}

            {selectedGender && (
                <div className='form-selection'>{/* Stats */}
                    {availableStats.map((stat) => {
                        const assignedPoints = selectedStats[stat.name] || 0
                        return (
                            <div className="stat-card" key={stat.name}>
                                <h4>{stat.name} - {BASE_STAT_VALUE + assignedPoints}</h4>
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

                    <p>Points Remaining: {statPointsLeft}</p>
                    <button
                        className="confirm-button"
                        onClick={() => setConfirmedStats(true)}
                        disabled={statPointsLeft > 0}>
                            Confirm Choices
                    </button>
                </div>
            )}

            {confirmedStats && (
                <div className='form-selection'>{/* Skills */}
                    {availableSkills.map(skill => {
                        const assignedSkillPoints = selectedSkills[skill.name] || 0
                        return (
                            <div key={skill.name} className="skill-card">
                                <h4>{skill.name} - {assignedSkillPoints}</h4>
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
                    <button
                        className="confirm-button"
                        onClick={() => setConfirmedSkill(true)}
                        disabled={skillPointsLeft > 0}>
                            Confirm Choices
                    </button>
                </div>
            )}
            
            {confirmedSkill && !confirmedCantrips && (
                <div className='form-selection'> {/* Cantrips */}
                    <h3>Select Your Cantrips, Hero</h3>
                        {availableCantrips.map((cantrip) => {
                            const isSelected = selectedCantrips.includes(cantrip.name)

                            return (
                                <div key={cantrip.name} className={`cantrip-card ${isSelected ? 'selected' : ''}`}>
                                <h4>{cantrip.name}</h4>
                                <p><strong>Range:</strong> {cantrip.range}</p>
                                <p><strong>Casting Time:</strong> {cantrip.castingTime}</p>
                                <p>{cantrip.description}</p>

                                <button onClick={() => {
                                    if (isSelected) {
                                    setSelectedCantrips(previousState => previousState.filter(name => name !== cantrip.name));
                                    } else if (selectedCantrips.length < 3) {
                                    setSelectedCantrips(previousState => [...previousState, cantrip.name])
                                    }
                                }}>
                                    {isSelected ? 'Unselect' : 'Select'}
                                </button>
                            </div>
                        )
                    })}
                    <p>Cantrips Selected: {selectedCantrips.length} / 3</p>
                    <button
                        className="confirm-button"
                        onClick={() => setConfirmedCantrips(true)}
                        disabled={selectedCantrips.length !== 3}>
                        
                        Confirm Cantrips
                    </button>
                </div>
            )}


            
            {confirmedCantrips && !confirmedLevel1Spells && (
                <div className='form-selection'> {/* Spells */}
                    <h3>Select Your Level 1 Spells, Hero</h3>
                        {availableLevel1Spells.map((spells_level_1) => {
                            const isSelected = selectedLevel1Spells.includes(spells_level_1.name)

                            return (
                            <div key={spells_level_1.name} className={`spells_level_1-card ${isSelected ? 'selected' : ''}`}>
                                <h4>{spells_level_1.name}</h4>
                                <p><strong>Range:</strong> {spells_level_1.range}</p>
                                <p><strong>Casting Time:</strong> {spells_level_1.castingTime}</p>
                                <p>{spells_level_1.description}</p>

                                <button onClick={() => {
                                    if (isSelected) {
                                    setSelectedLevel1Spells(previousState => previousState.filter(name => name !== spells_level_1.name));
                                    } else if (selectedLevel1Spells.length < 4) {
                                    setSelectedLevel1Spells(previousState => [...previousState, spells_level_1.name])
                                    }
                                }}>
                                    {isSelected ? 'Unselect' : 'Select'}
                                </button>
                            </div>
                        )
                    })}
                    <p>Level 1 Spells Selected: {selectedLevel1Spells.length} / 4</p>
                    <button
                        className="confirm-button"
                        onClick={() => setConfirmedLevel1Spells(true)}
                        disabled={selectedLevel1Spells.length !== 4}>
                        
                        Confirm Level 1 Spells
                    </button>
                </div>
            )}

            {confirmedCantrips && !confirmedLevel2Spells && (
                <div className='form-selection'> {/* Spells */}
                    <h3>Select Your Level 2 Spells, Hero</h3>
                        {availableLevel2Spells.map((spells_level_2) => {
                            const isSelected = selectedLevel2Spells.includes(spells_level_2.name)

                            return (
                            <div key={spells_level_2.name} className={`spells_level_2-card ${isSelected ? 'selected' : ''}`}>
                                <h4>{spells_level_2.name}</h4>
                                <p><strong>Range:</strong> {spells_level_2.range}</p>
                                <p><strong>Casting Time:</strong> {spells_level_2.castingTime}</p>
                                <p>{spells_level_2.description}</p>

                                <button onClick={() => {
                                    if (isSelected) {
                                    setSelectedLevel2Spells(previousState => previousState.filter(name => name !== spells_level_2.name));
                                    } else if (selectedLevel2Spells.length < 2) {
                                    setSelectedLevel2Spells(previousState => [...previousState, spells_level_2.name])
                                    }
                                }}>
                                    {isSelected ? 'Unselect' : 'Select'}
                                </button>
                            </div>
                        )
                    })}
                    <p>Level 2 Spells Selected: {selectedLevel2Spells.length} / 2</p>
                    <button
                        className="confirm-button"
                        onClick={() => setConfirmedLevel2Spells(true)}
                        disabled={selectedLevel2Spells.length !== 2}>
                        
                        Confirm Level 2 Spells
                    </button>
                </div>
            )}


            <div className='form-selection'> {/* Name */}
                {/* Add content for Name selection here */}
            </div>
            <div className='form-selection submit-button'> {/* Submit */}
                {/* Add content for Submit button here */}
            </div>
        </section>
    )
}

export default FormCustomize;