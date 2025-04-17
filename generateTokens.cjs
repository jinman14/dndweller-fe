const fs = require('fs');

const races = ["Human", "Elf", "Dwarf", "Gnome", "Halfling", "Half-Elf", "Half-Orc", "Tiefling", "Dragonborn"]
const genders = ["Male", "Female"]
const classes = ["Fighter", "Rogue", "Cleric", "Bard", "Wizard"]

let tokens = []
let id = 1

races.forEach(characterRace => {
    genders.forEach(characterGender => {
        classes.forEach(characterClass => {
            tokens.push({
                id: id++,
                race: characterRace,
                class: characterClass,
                gender: characterGender,
                url: "https://drive.google.com/uc?export=view&id="
            })
        })
    })
})

fs.writeFileSync('./public/assets/tokens.json', JSON.stringify(tokens, null, 2))
console.log("Tokens have been created: ", tokens.length, "entries")