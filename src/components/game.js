import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { games, domains } from '../data/data';
import './game.css'
import { ImageWithFallback } from './image';
import { Pill } from './pill';

export const Game = (props) => {
    const params = useParams();
    const game = games.find(game => game.slug === params.gameId)
    const { image, title, domains: gameDomains } = game;
    const richedDomains = gameDomains.map(gd => domains.find(d => gd === d.id))
    return (
        <div className='game'>
            <div className='game-content'>
                <h1 className='title-mobile'>{title}</h1>
                <ImageWithFallback className='game-image' src={process.env.PUBLIC_URL + image} alt={title}/>
                <div className='game-description'>
                    <h1>{title}</h1>
                    <div className='game-domains'>
                        {richedDomains.map(domain => {
                            return (
                                <Link key={domain.id} to={`/?domain=${domain.parent ? domain.parent : domain.id}${domain.parent ? `&subdomain=${domain.id}` : ''}`}>
                                    <Pill label={domain.label}/>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}