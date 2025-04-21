import './SheetView.css';

const SheetView = () => {
  const char = {
    character_name: "Jarisemosha",
    level: 3,
    race: "Human",
    class: "Bard",
    gender: "male",
    speed: 30,
    languages: ["Common", "Gnomish"],
    proficiency: 2,
    armor_class: 11,
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
  };

  return (
    <div className="sheet-grid">

      <section className="header">
        <h1>{char.character_name}</h1>
        <p>{char.race} {char.class} | Level {char.level}</p>
      </section>

      <section className="stats">
        {Object.entries(char.statistics).map(([key, value]) => (
          <div className="stat" key={key}>
            <h3>{key.toUpperCase()}</h3>
            <p>{value}</p>
          </div>
        ))}
      </section>

      <section className="core-info">
        <p><strong>AC:</strong> {char.armor_class}</p>
        <p><strong>Speed:</strong> {char.speed} ft</p>
        <p><strong>Proficiency:</strong> +{char.proficiency}</p>
        <p><strong>Languages:</strong> {char.languages.join(', ')}</p>
      </section>

      <section className="skills">
        <h2>Spells / Skills</h2>
        <ul>
          {char.skills.map((skill, i) => (
            <li key={i}>
              <strong>{skill.name}</strong> (Lvl {skill.level})<br />
              {skill.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="equipment">
        <h2>Equipment</h2>
        <ul>
          {char.equipment.map((item, i) => (
            <li key={i}>
              <strong>{item.name}</strong> — 
              {item.damage_dice ? `${item.damage_dice} ${item.damage_type}` : `AC ${item.base}${item.dex_bonus ? ' + DEX' : ''}`}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SheetView;
