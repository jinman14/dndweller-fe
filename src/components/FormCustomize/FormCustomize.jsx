import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


function FormCustomize() {
    const navigate = useNavigate()

    const { state } = useLocation();    
    const selectedToken = state?.selectedToken;
    const selectedGender = state?.selectedGender;
    const selectedStats = state?.selectedStats;
    const selectedSkills = state?.selectedSkills;
    const selectedClass = state?.selectedClass;
    const selectedRace = state?.selectedRace;

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
    const [characterName, setCharacterName] = useState("")  

    useEffect(() => {
        if(!selectedClass) return

        fetch('/spells_n_cantrips_data.json')
        .then((response) => response.json())
        .then((data) => {
            const filterCantrips = data.cantrips.filter((cantrip) => {
                return cantrip.recommendedFor.includes(selectedClass)
            })
            const filterLevel1Spells = data.spells_level_1.filter((level1) => {
                return level1.recommendedFor.includes(selectedClass)
            })
            const filterLevel2Spells = data.spells_level_2.filter((level2) => {
                return level2.recommendedFor.includes(selectedClass)
            })
            setAvailableCantrips(filterCantrips)
            setAvailableLevel1Spells(filterLevel1Spells)
            setAvailableLevel2Spells(filterLevel2Spells)
        })
    }, [selectedClass])

    useEffect(() => {
        if (!selectedClass) return

        fetch('/weapons_n_armor.json')
        .then((response) => response.json())
        .then((data) => {
            const filteredWeapons = data.weapons.filter((weapon) => {
                return weapon.recommendedFor.includes(selectedClass)
            })
            const filteredArmor = data.armor.filter((armor) => {
                return armor.recommendedFor.includes(selectedClass)
            })
            setAvailableWeapons(filteredWeapons)
            setAvailableArmor(filteredArmor)
        })
    }, [selectedClass])

    return (
        <section>
            {selectedRace && selectedClass && (
                <div className='form-selection confirmed-gear'>
                  <h3>Final Review</h3>
                  <p><strong>Race:</strong> {selectedRace}</p>
                  <p><strong>Class:</strong> {selectedClass}</p>
                </div>
            )}

            {selectedStats && Object.keys(selectedStats).length > 0 && (
              <div className='form-selection confirmed-gear'>
                <h4>Stats (Base 8 + Bonus):</h4>
                <ul>
                  {Object.entries(selectedStats).map(([stat, bonus]) => {
                    const total = 8 + bonus;
                    const modifier = Math.floor((total - 10) / 2)
                    const modifierLabel = modifier >= 0 ? `+${modifier}` : modifier
                        return (
                        <li key={stat}>
                            {stat}: {total} (mod: {modifierLabel})
                        </li>
                        )
                    })}
                </ul>
              </div>
            )}

            {selectedSkills && Object.keys(selectedSkills).length > 0 && (
              <div className='form-selection confirmed-gear'>
                <h4>Skills (Proficient if {'>'} 0):</h4>
                <ul>
                  {Object.entries(selectedSkills).map(([skill, value]) => {
                    const proficiencyBonus = value > 0 ? 2 : 0
                        return (
                        <li key={skill}>
                            {skill}: +{proficiencyBonus}
                        </li>
                        )
                    })}
                </ul>
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
            
            {confirmedWeapon && confirmedArmor && !confirmedCantrips && (
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

            {confirmedLevel1Spells && !confirmedLevel2Spells && (
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

            {confirmedLevel2Spells && (
                <div className='form-selection'> {/* Name */}
                    <h3>Name Your Hero</h3>
                    <input 
                        type="text"
                        value={characterName}
                        onChange={(event) => {
                            setCharacterName(event.target.value)
                        }}
                        placeholder="Enter Character Name..."                        
                    />
                </div>
            )}
            
            {characterName && (
                <div className='form-selection'> {/* Submit Button */}
                    <button
                    className="confirm-button"
                    onClick={() => {
                        navigate("/sheet", {
                            state: {
                              skills: selectedSkills,
                              cantrips: selectedCantrips,
                              level1Spells: selectedLevel1Spells,
                              level2Spells: selectedLevel2Spells,
                              weapon: selectedWeapon,
                              armor: selectedArmor
                            }
                        })
                    }}
                    >Submit Your Dweller!
                    </button>
                </div>
            )}
        </section>
    )
}

export default FormCustomize;