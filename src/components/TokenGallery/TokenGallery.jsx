import { useEffect, useState, useTransition } from "react";
import '../TokenGallery/TokenGallery.css';


function TokenGallery() {
    const [tokens, setTokens] = useState([])
    const [selectedTokenId, setSelectedTokenId] = useState(null)

    useEffect(() => {
        fetch('/public/tokens_info.json')
        .then(response => response.json())
        .then(data => setTokens(data))
    }, [])

	return (
		<section>
            <h2>Hero. What is your path?</h2>
            <p>Choose your token, gender, weapon, armor, skills, and spells.</p>
			
            <p>Tokens loaded: {tokens.length}</p>

            <div className="token-grid">
                {tokens.map((token) => (
                    <div className={`token-card ${selectedTokenId === token.id ? "selected" : ""}`} key={token.id}
                    onClick={() => setSelectedTokenId(token.id)}>

                    <img src={token.url} alt={`${token.race} ${token.class}`} />
                    <p>{token.race} {token.class}</p>
                    </div>
                ))}
            </div>
                        
		</section>
	)
}

export default TokenGallery;