import React from 'react';
import './with-description.css'

export const WithDescription = ({descriptionSelected, onDescriptionSelected}) => {
    return (
        <div className='with-description'>
            <input checked={descriptionSelected} type={"checkbox"} id='description' onChange={(e) => onDescriptionSelected(e.target.checked)} />
            <label htmlFor='description'>Chercher dans la description</label>
        </div>
    )
}