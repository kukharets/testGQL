import React, {  useState, useEffect } from 'react';
import ClawsBottom from './assests/ClawsBottom.svg';
import ClawsUpper from './assests/ClawsUpper.svg';

function Claws({handleModalOpenState}) {
    const [hovered, setHovered] = useState(false);

    const toggleHovered = () => {
        setHovered(!hovered)
    };
    return (
        <div onClick={handleModalOpenState} className={`claws-wrapper`} onMouseEnter={toggleHovered} onMouseLeave={toggleHovered}>
            <div className={`claws-upper-wrapper`} >
                <img className={`claws-upper ${hovered ? 'hovered' : ''}`} src={ClawsUpper} alt=""/>
            </div>
            <img src={ClawsBottom} alt=""/>
        </div>
    )
}

export default Claws;