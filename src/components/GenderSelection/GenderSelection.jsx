function GenderSelection({ onSelectGender }) {
    return (
        <section>
            <h3>What gender is you hero?</h3>
            <label>
                <input type="radio" name="gender" value="Male" onChange={() => onSelectGender("Male")} />
                Male
            </label>
            <label>
                <input type="radio" name="gender" value="Female" onChange={() => onSelectGender("Female")}/>
                Female
            </label>
        </section>
    )
}

export default GenderSelection;