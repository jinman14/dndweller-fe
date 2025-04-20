import { useState } from "react";
import TokenGallery from '../TokenGallery/TokenGallery';

function FormCustomize() {
    const [selectedToken, setSelectedToken] = useState(null)

    return (
        <section>

            <div className='form-selection'>{/* Token */}
                <TokenGallery onSelect={setSelectedToken} />
            </div> 

            {selectedToken && (
                <div>
                    <h3>Token Selected!</h3>
                    <p>{selectedToken.race} {selectedToken.class}</p>
                    <div className="token-card confirmed-token">
                    <img src={selectedToken.url} alt="preview" style={{ width: '100px' }} />
                    </div>
                </div>
            )}

            <div className='form-selection'></div> {/* Gender */}


            
            <div className='form-selection'></div> {/* Skills */}
            <div className='form-selection'></div> {/* Spells */}
            <div className='form-selection'></div> {/* Name */}
            <div className='form-selection submit-button'></div> {/* Submit */}

        </section>
    )
}

export default FormCustomize;