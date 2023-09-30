import React from "react";


function CircleColorPicker ({color, background, handleChange, text, style, className}) {

    return (
        <label className={`color-selector ${className}`} style={style} >
            <span className='circle' style={{ background: background }} />
            <input
                type="color"
                value={color}
                onChange={handleChange}
                className='hidden'
            />
            {!text ? '' : <span className="text">{text}</span>}
        </label>
    )
}

export default CircleColorPicker