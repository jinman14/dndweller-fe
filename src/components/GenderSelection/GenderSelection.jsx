function GenderSelect() {
    return (
        <section>
            <h3>What gender is you hero?</h3>
            <label>
                <input type="radio" name="gender" value="Male" />
                Male
            </label>
            <label>
                <input type="radio" name="gender" value="Female" />
                Female
            </label>
        </section>
    )
}

export default GenderSelect;