import { useEffect, useState, useTransition } from "react";
import '../TokenGallery/TokenGallery.css';


function TokenGallery( {onSelect} ) {
    const [tokens, setTokens] = useState([])
    const [selectedTokenId, setSelectedTokenId] = useState(null)
    const [confirmToken, setConfirmToken] = useState(null)

    useEffect(() => {
        fetch('/tokens_info.json')
        .then(response => response.json())
        .then(data => setTokens(data))
    }, [])

	return (
		<section>
            <h2>Hero, what is your path?</h2>
            <p>Choose your token, gender, weapon, armor, skills, and spells.</p>
			
            {!confirmToken && <p>Tokens available: {tokens.length}</p>}

            {!confirmToken && (
                <div className="token-grid">
                    {tokens.map((token) => (
                        <div className={`token-card ${selectedTokenId === token.id ? "selected" : ""}`} 
                        key={token.id} onClick={() => setSelectedTokenId(token.id)}>
                        
                        <img src={token.url} alt={`${token.race} ${token.class}`} />
                        <p>{token.race} {token.class}</p>
                        </div>
                    ))}
                </div>
            )}

            {selectedTokenId !== null && !confirmToken && (
                <button onClick={() => {
                    const selected = tokens.find(token => token.id === selectedTokenId)
                    setConfirmToken(selected)
                    onSelect(selected)
                }}>
                Confirm </button>
            )}
                        
		</section>
	)
}

export default TokenGallery;