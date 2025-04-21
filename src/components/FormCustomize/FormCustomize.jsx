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

            {selectedGender && (
                <div className='form-selection'>{/* Stats */}
                    {availableStats.map((stat) => {
                        const assignedPoints = selectedStats[stat.name] || 0
                        return (
                            <div className="stat-card" key={stat.name}>
                                <h4>{stat.name} - {BASE_STAT_VALUE + assignedPoints}</h4>
                                <p>{stat.description}</p>
                                <p><strong>Recommended for:</strong> {stat.recommendedFor.join(", ")}</p>
                            
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

            <div className='form-selection'></div> {/* Skills */}
            <div className='form-selection'></div> {/* Spells */}
            <div className='form-selection'></div> {/* Name */}
            <div className='form-selection submit-button'></div> {/* Submit */}
        </section>
    )
}

export default FormCustomize;