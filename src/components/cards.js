import React from "react";
import { Link } from "react-router-dom";
import { Card } from "./card";
import './cards.css'
export const Cards = ({games}) => {
    return (
        <div className='cards'>
            {games.map(game => {
                return (
                    <Link key={game.id} to={`/games/${game.slug}`}>
                        <Card {...game} />
                    </Link>
                )
            })}
        </div>
    )
}