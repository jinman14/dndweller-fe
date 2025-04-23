import React from 'react';
import './ResourcesPage.css';

const resources = [
  { name: 'GitHub Repository (Frontend)', url: 'https://github.com/jinman14/dndweller-fe' },
  { name: 'GitHub Repository (Backend)', url: 'https://github.com/jinman14/dndweller-be' },
  { name: '5e SRD API', url: 'https://www.dnd5eapi.co/' },
  { name: '5e Character Sheet (Fillable PDF)', url: 'https://media.wizards.com/2016/dnd/downloads/5E_CharacterSheet_Fillable.pdf' },
  { name: 'D&D Beyond', url: 'https://www.dndbeyond.com/' },
  { name: 'Roll20', url: 'https://roll20.net/' },
  { name: 'Owlbear Rodeo', url: 'https://www.owlbear.rodeo/' },
  { name: 'Donjon RPG Tools', url: 'https://donjon.bin.sh/' },
  { name: '5e SRD (System Reference Document)', url: 'https://5e.tools/' },
  { name: 'Fantasy Name Generators', url: 'https://www.fantasynamegenerators/' },
  { name: 'r/DnD (Reddit)', url: 'https://www.reddit.com/r/DnD' },
  { name: 'Tabletop Audio', url: 'https://www.tabletopaudio.com/' },
  { name: 'DriveThruRPG', url: 'https://www.drivethrurpg.com/en/' },
  { name: 'DMs Guild', url: 'https://www.dmsguild.com/' },
  { name: 'Fantasy Map Generator by Azgaar', url: 'https://azgaar.github.io/Fantasy-Map-Generator/' },
  { name: 'DnD 5e Wikidot', url: 'https://dnd5e.wikidot.com/' },
  { name: 'Hero Forge', url: 'https://www.heroforge.com/' },
  { name: 'Token Stamp / Dice Roller', url: 'https://rolladvantage.com/tokenstamp/' }
]

function ResourcesPage() {
    return (
      <div className="resources-container">
        <h2>Here are some links to other resources you may find useful!</h2>
        <ul className="resources-list">
          {resources.map((res) => (
            <li key={res.url}>
              <a href={res.url} target="_blank" rel="noopener noreferrer">
                {res.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default ResourcesPage;