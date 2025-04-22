import React from 'react';
import './CharacterVaultRow.css';

const CharacterVaultRow = ({ character }) => {
    return (
        <div className="character-row">
            <img src={character.token_url} alt={`${character.character_name} token`} className="token-img" />
            <div className="character-info">
                <h3>{character.character_name}</h3>
                <p> Class: {character.class}</p>
                <p>Race: {character.race}</p>
                <p>Level: {character.level}</p>
                <p>Creator: {character.creator || "The All Seer"}</p>
            </div>
        </div>
    )
}

export default CharacterVaultRow;