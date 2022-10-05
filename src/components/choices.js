import React from "react";
import './choices.css'

export const Choices = ({choices, selected, onSelect}) => {
    return (
        <select className="choices" onChange={(e) => onSelect(e.target.value)} value={selected || ""}>
            <option value={""}>-- Tous --</option>
            {choices.map(choice => {
                return <option key={choice.id} value={choice.id}>{choice.label}</option>
            })}
        </select>
    )
}