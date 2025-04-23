import React from 'react';
import './ResourcesPage.css';

const resources = [
  { name: 'D&D Beyond', url: 'https://www.dndbeyond.com/' },
  { name: 'Roll20', url: 'https://roll20.net/' },
  { name: 'Owlbear Rodeo', url: 'https://www.owlbear.rodeo/' },
  { name: 'Donjon RPG Tools', url: 'https://donjon.bin.sh/' },
  { name: '5e SRD (System Reference Document)', url: 'https://5e.tools/' },
  { name: 'Fantasy Name Generators', url: 'https://www.fantasynamegenerators/' },
  { name: 'r/DnD (Reddit)', url: 'https://www.reddit.com/r/DnD' },
  { name: 'Tabletop Audio', url: 'https://www.tabletopaudio.com/' },
]

function ResourcesPage() {
    return (
      <div className="resources-container">
        <h2>Here are some links to other resources you may find useful!</h2>
        <ul className="resources-list">
          {resources.map((res) => (
            <li key={res.url}>
              <a href={res.url} target="_blank" rel="noopener noreferrer">
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default ResourcesPage;