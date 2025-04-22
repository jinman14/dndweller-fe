import React, { useEffect, useState } from 'react';
import CharacterVaultRow from '../CharacterVaultRow/CharacterVaultRow.jsx';
import './CharacterVault.css';

function CharacterVault() {
  const [characters, setCharacters] = useState([]);

  // useEffect(() => { this is for later when the backend is connected
    //fetch('http://localhost:3000/api/v1/characters')
    //  .then(res => res.json())
    //  .then(data => setCharacters(data))
    //  .catch(err => console.error("Error fetching characters:", err));
    //}, []);

    const mockCharacters = [
      {
        id: 1,
        character_name: "Jarisemosha",
        level: 3,
        Hp: 20,
        race: "Human",
        class: "Bard",
        gender: "male",
        speed: 30,
        languages: ["Common", "Gnomish"],
        proficiency: 2,
        armor_class: 11,
        creator: "DM_Alpha",
        token_url: "https://via.placeholder.com/64", // sample image
        statistics: {
          str: 10,
          dex: 10,
          con: 10,
          int: 10,
          wis: 10,
          cha: 10
        },
        equipment: [
          { name: "Longsword", damage_dice: "1d8", damage_type: "slashing", range: 5 },
          { name: "Leather Armor", base: 11, dex_bonus: true }
        ],
        skills: [
          {
            name: "Acid-Arrow",
            level: 2,
            damage_type: "acid",
            range: "90 feet",
            description: "A shimmering green arrow streaks toward a target..."
          }
        ]
      },
      {
        id: 2,
        character_name: "Throg the Mighty",
        level: 5,
        race: "Orc",
        class: "Barbarian",
        creator: "Player_Two",
        token_url: null // simulate missing image
      }
    ];

    useEffect(() => {
      const fetchMockData = async () => {
        await new Promise((response) => setTimeout(response, 300));
        setCharacters(mockCharacters);
      }

      fetchMockData();
    }, [])

  return (
    <section className="row-view">
      <h2>Character Vault</h2>
      {characters.map((character) => (
        <CharacterVaultRow key={character.id} character={character} />
      ))}
    </section>
  );
}

export default CharacterVault;