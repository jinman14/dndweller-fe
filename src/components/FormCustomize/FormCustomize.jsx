import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const gearData = {
    "weapons": [
      {
        "name": "Longsword",
        "description": "A versatile blade favored by skilled warriors.",
        "range": "Melee",
        "recommendedFor": ["Fighter"]
      },
      {
        "name": "Dagger",
        "description": "A small, easily concealed blade ideal for quick strikes.",
        "range": "Melee / Thrown (20/60 ft)",
        "recommendedFor": ["Rogue"]
      },
      {
        "name": "Mace",
        "description": "A heavy-headed weapon used to crush through armor.",
        "range": "Melee",
        "recommendedFor": ["Cleric"]
      },
      {
        "name": "Rapier",
        "description": "A slender, flexible blade designed for precision.",
        "range": "Melee",
        "recommendedFor": ["Bard"]
      },
      {
        "name": "Quarterstaff",
        "description": "A simple, two-handed wooden staff often used with magic.",
        "range": "Melee",
        "recommendedFor": ["Wizard"]
      }
    ],
    "armor": [
      {
        "name": "Chain Mail",
        "description": "Interlocking metal rings offering great protection.",
        "recommendedFor": ["Fighter"],
        "ac": 16
      },
      {
        "name": "Leather Armor",
        "description": "Flexible armor made from toughened leather.",
        "recommendedFor": ["Rogue"],
        "ac": 11
      },
      {
        "name": "Scale Mail",
        "description": "Overlapping metal plates that provide solid defense.",
        "recommendedFor": ["Cleric"],
        "ac": 14
      },
      {
        "name": "Studded Leather",
        "description": "Leather armor reinforced with metal studs for added protection.",
        "recommendedFor": ["Bard"],
        "ac": 12
      },
      {
        "name": "Mage Robes",
        "description": "Cloth garments enchanted with light magical protection.",
        "recommendedFor": ["Wizard"],
        "ac": 10
      }
    ]
  }


function FormCustomize() {
    const navigate = useNavigate()

    const { state } = useLocation();    
    const selectedToken = state?.selectedToken;
    const selectedGender = state?.selectedGender;
    const selectedStats = state?.selectedStats;
    const selectedSkills = state?.selectedSkills;
    const selectedClass = state?.selectedClass;
    const selectedRace = state?.selectedRace;
    const selectedLanguages = state?.selectedLanguages || [];

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

    const hasCantrips = availableCantrips.length > 0
    const hasLevel1Spells = availableLevel1Spells.length > 0
    const hasLevel2Spells = availableLevel2Spells.length > 0

    useEffect(() => {
        if(!selectedClass) return

        fetch(`https://www.dnd5eapi.co/api/2014/classes/${selectedClass.toLowerCase()}/spells`)
        .then((response) => response.json())
        .then((data) => {
            const filterCantrips = data["results"].filter((spell) => {
                return spell["level"] === 0
            })
            const filterLevel1Spells = data["results"].filter((spell) => {
                return spell["level"] === 1
            })
            const filterLevel2Spells = data["results"].filter((spell) => {
                return spell["level"] === 2
            })

            setAvailableCantrips(filterCantrips)
            setAvailableLevel1Spells(filterLevel1Spells)
            setAvailableLevel2Spells(filterLevel2Spells)
        })
    }, [selectedClass])

    useEffect(() => {
        if (!selectedClass) return

        fetch("/weapons_n_armor.json")
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

    function getArmorClass(armor) {
        return gearData["armor"].filter((armor) => {
            return armor.name === armor["ac"]
        })
    }

    const postCharacter = (characterData) => {
        fetch("http://127.0.0.1:3000/api/v1/characters", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: characterData.name,
                token: characterData.token.url,
                level: 3,
                race: characterData.race,
                class: characterData.class,
                gender: characterData.gender,
                speed: characterData.speed,
                languages: characterData.languages,
                armor_class: characterData.ac,
                str: characterData.stats.Strength,
                dex: characterData.stats.Dexterity,
                con: characterData.stats.Constitution,
                int: characterData.stats.Intelligence,
                wis: characterData.stats.Wisdom,
                cha: characterData.stats.Charisma,
                hp: characterData.hp,
                user_id: 1,
                equipment: [
                    {
                        name: characterData.weapon,
                        damage_dice: "N/A",
                        damage_type: "N/A",
                        range: 0
                    },
                    {
                        name: characterData.armor,
                        base: 0,
                        dex_bonus: true
                    }
                ],
                skills: characterData.cantrips
                .concat(characterData.level1Spells, characterData.level2Spells)
                .map((spell) => {
                    return {
                        name: spell,
                        level: 0,
                        damage_type: "N/A",
                        range: "N/A",
                        description: "N/A"
                    }
                })
            })
        })
        .then((response) => response.json())
        .then((data) => {
            navigate("/sheet", {
                state: {
                    character: {
                        name: characterName,
                        race: selectedRace,
                        class: selectedClass,
                        gender: selectedGender,
                        token: selectedToken,
                        stats: characterData.stats,
                        skills: selectedSkills,
                        cantrips: selectedCantrips,
                        level1Spells: selectedLevel1Spells,
                        level2Spells: selectedLevel2Spells,
                        weapon: selectedWeapon,
                        armor: selectedArmor,
                        hp: characterData.hp,
                        speed: characterData.speed,
                        languages: selectedLanguages
                    }
                }
                
            })
        })
    }

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
                <h4>Skills (Proficient if Stat Mod is {'>'} 0):</h4>
                <ul>
                  {Object.entries(selectedSkills).map(([skill, value]) => {
                    console.log(selectedSkills)
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
            
            {confirmedWeapon && confirmedArmor && hasCantrips && !confirmedCantrips && (
                <div className='form-selection'> {/* Cantrips */}
                    <h3>Select Your Cantrips, Hero</h3>
                    {availableCantrips.map((cantrip) => {
                    const isSelected = selectedCantrips.includes(cantrip.name)

                    return (
                        <div key={cantrip.name} className={`cantrip-card ${isSelected ? 'selected' : ''}`}>
                        <h4>{cantrip.name}</h4>

                        <button onClick={() => {
                            if (isSelected) {
                            setSelectedCantrips(prev => prev.filter(name => name !== cantrip.name));
                            } else if (selectedCantrips.length < 3) {
                            setSelectedCantrips(prev => [...prev, cantrip.name]);
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

            {confirmedWeapon && confirmedArmor && !hasCantrips && !hasLevel1Spells && !confirmedCantrips && (
            <div className='form-selection'>
                <h3>This class doesn't use cantrips.</h3>
                <p>Proceeding to Level 1 spells.</p>
                <button
                    className="confirm-button"
                        onClick={() => {
                            setConfirmedCantrips(true)
                        }}>
                    Continue
                </button>
            </div>
            )}


            
            {confirmedCantrips && hasLevel1Spells && !confirmedLevel1Spells && (
                <div className='form-selection'> {/* Spells */}
                    <h3>Select Your Level 1 Spells, Hero</h3>
                        {availableLevel1Spells.map((spells_level_1) => {
                            const isSelected = selectedLevel1Spells.includes(spells_level_1.name)
                            
                            return (
                                <div key={spells_level_1.name} className={`spells_level_1-card ${isSelected ? 'selected' : ''}`}>
                                <h4>{spells_level_1.name}</h4>

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

            {confirmedLevel1Spells && hasLevel2Spells && !confirmedLevel2Spells && (
                <div className='form-selection'> {/* Spells */}
                    <h3>Select Your Level 2 Spells, Hero</h3>
                        {availableLevel2Spells.map((spells_level_2) => {
                            const isSelected = selectedLevel2Spells.includes(spells_level_2.name)
                            
                            return (
                                <div key={spells_level_2.name} className={`spells_level_2-card ${isSelected ? 'selected' : ''}`}>
                                <h4>{spells_level_2.name}</h4>

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

            {confirmedWeapon && confirmedArmor && confirmedCantrips && !hasLevel1Spells && !confirmedLevel1Spells && (
                <div className='form-selection'>
                    <h3>No Level 1 Spells Available for Your Class</h3>
                    <p>Skipping this spells section.</p>
                    <button
                        className="confirm-button"
                        onClick={() => {
                            setConfirmedLevel1Spells(true)
                        }}>
                        Continue
                    </button>
                </div>
            )}
            
            {confirmedWeapon && confirmedArmor && confirmedCantrips && confirmedLevel1Spells && !hasLevel2Spells && !confirmedLevel2Spells && (
                <div className='form-selection'>
                    <h3>No Level 2 Spells Available for Your Class</h3>
                    <p>Skipping this spells section.</p>
                        <button
                            className="confirm-button"
                            onClick={() => {
                                setConfirmedLevel2Spells(true)
                            }}>
                            Continue
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
                            const getHitPoints = (characterClass, conMod = 0, level = 3) => {
                                const hitDiceMap = {
                                Fighter: 10,
                                Rogue: 8,
                                Bard: 8,
                                Cleric: 8,
                                Wizard: 6
                                }
                            
                                const hitDie = hitDiceMap[characterClass] || 6
                                const firstLevel = hitDie // Max at level 1
                                const averagePerLevel = Math.floor(hitDie / 2) + 1 // Average per level after 1
                            
                                return firstLevel + (averagePerLevel * (level - 1)) + (conMod * level)
                            }

                            const getSpeedForRace = (race) => {
                                const speedTable = {
                                    Human: 30,
                                    Elf: 30,
                                    "Half-Elf": 30, // had to use "" for this to work 
                                    Dwarf: 25,
                                    Halfling: 25,
                                    Gnome: 25,
                                    "Half-Orc": 30,
                                    Tiefling: 30,
                                    Dragonborn: 30
                                }
                                return speedTable[race] || "N/A"
                            }

                            const BASE_STAT_VALUE = 8;
                            const ALL_STATS = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"]

                            const normalizedStats = ALL_STATS.reduce((acc, stat) => {
                            const bonus = selectedStats[stat] || 0
                            acc[stat] = BASE_STAT_VALUE + bonus
                            return acc
                        }, {})

                            const conScore = normalizedStats.Constitution || 8
                            const conMod = Math.floor((conScore - 10) / 2)        
                            const character = {
                                name: characterName,
                                race: selectedRace,
                                class: selectedClass,
                                gender: selectedGender,
                                token: selectedToken,
                                stats: normalizedStats,
                                skills: selectedSkills,
                                cantrips: selectedCantrips,
                                level1Spells: selectedLevel1Spells,
                                level2Spells: selectedLevel2Spells,
                                weapon: selectedWeapon,
                                armor: selectedArmor,
                                hp: getHitPoints(selectedClass, conMod, 3),
                                speed: getSpeedForRace(selectedRace),
                                languages: selectedLanguages,
                                ac: getArmorClass(selectedArmor)
                            }

                            postCharacter(character)
                        }}
                        >Submit Your Dweller!
                    </button>
                </div>
            )}
        </section>
    )
}

export default FormCustomize;