import React from "react";
import './search.css'

export const Search = ({search, onChange, withDescription}) => {
    return (
        <input placeholder={`Numéro, titre${withDescription ? ', description': ''}`} type={"search"} className="search" onChange={(e) => onChange(e.target.value)} value={search} />
    )
}