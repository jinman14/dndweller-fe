import { useLocation } from 'react-router-dom';
import './SheetView.css';


const SheetView = () => {
  const { state } = useLocation()
  const character = state?.character

  return (
    <div className="sheet-grid">
      <section className="header">
        <h1>{character?.name || "Name not found"}</h1>
        <p>{character?.race || "Race not found |"} | {character?.class || "Class not found |"} | Level {character?.level || 3} |</p>
      </section>

      <section className="stats">
        {character?.stats ? Object.entries(character.stats).map(([key, value]) => {
          const modifier = Math.floor((value - 10) / 2)
          const modifierLabel = modifier >= 0 ? `+${modifier}` : modifier

          return (
            <div className='stat' key={key}>
              <h3>{key.toUpperCase()}</h3>
              <p>{value}</p>
              <p>(Stat Mod:{modifierLabel})</p>
            </div>
          )
        })
        : <p>No stats available</p>
      }
      </section>

      <section className="core-info">
        <p><strong>AC:</strong> {character?.armor || "N/A"}</p>
        <p><strong>HP:</strong> {character?.Hp || character?.hp || "N/A"}</p>
        <p><strong>Speed:</strong> {character?.speed ? `${character.speed} ft` : "N/A"}</p>
        <p><strong>Proficiency:</strong> +{character?.proficiency || +2}</p>
        <p><strong>Languages:</strong> {Array.isArray(character?.languages) ? character.languages.join(', ') : "N/A"}</p>
      </section>

      <section className="skills">
        <h2>Spells & Skills</h2>
        <ul>
          {character?.cantrips?.length > 0 && (
            <>
              <li><strong>Cantrips:</strong></li>
                {character.cantrips.map((spell, index) => (
              <li key={`cantrip-${index}`}> {spell}</li>
              ))}
            </>
          )}

          {character?.level1Spells?.length > 0 && (
            <>
              <li><strong>Level 1 Spells:</strong></li>
                {character.level1Spells.map((spell, index) => (
              <li key={`level1-${index}`}> {spell}</li>
              ))}
            </>
          )}

          {character?.level2Spells?.length > 0 && (
            <>
              <li><strong>Level 2 Spells:</strong></li>
                {character.level2Spells.map((spell, index) => (
              <li key={`level2-${index}`}> {spell}</li>
              ))}
            </>
          )}

          {character?.skills && Object.keys(character.skills).length > 0 && (
            <>
              <li><strong>Skills:</strong></li>
                {Object.entries(character.skills).map(([skill, value], index) => (
              <li key={`skill-${index}`}>{skill}: +{value > 0 ? 2 : 0}</li>
              ))}
            </>
          )}
        </ul>     

        {!character?.cantrips?.length && !character?.level1Spells?.length && !character?.level2Spells?.length && (
          !character?.skills || Object.keys(character.skills).length === 0) && (
          <li>No skills or spells listed.</li>
        )}
      </section>

      <section className="equipment">
        <h2>Equipment</h2>
        <ul>
          {character?.weapon && (
            <li>
              <strong>Weapon:</strong> {Array.isArray(character.weapon) ? character.weapon.join(', ') : character.weapon}
            </li>
          )}
          {character?.armor && (
            <li>
              <strong>Armor:</strong> {Array.isArray(character.armor) ? character.armor.join(', ') : character.armor}
            </li>
          )}
          {!character?.weapon && !character?.armor && (
            <li>No equipment listed.</li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default SheetView;
