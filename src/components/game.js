import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { games, domains } from '../data/data';
import './game.css'
import { ImageWithFallback } from './image';
import { Pill } from './pill';
import children from './children-solid.svg'
import file from './file-lines-regular.svg'

export const Game = (props) => {
    const params = useParams();
    const game = games.find(game => game.slug === params.gameId)
    const { description, manual, age, image, title, domains: gameDomains } = game;
    const richedDomains = gameDomains.map(gd => domains.find(d => gd === d.id))
    return (
        <div className='game'>
            <div className='game-content'>
                <h1 className='title-mobile'>{title}</h1>
                <ImageWithFallback className='game-image' src={process.env.PUBLIC_URL + image} alt={title}/>
                <div className='game-details'>
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
                    {(age || manual) && 
                        <div className='game-infos'>
                            {age && <label className='age'><img src={children}></img><span>À partir de {age} ans</span></label>}
                            {manual && <a className='notice' href={process.env.PUBLIC_URL + manual} title="Notice" target="_blank"><img src={file}></img>Notice</a>}
                        </div>
                    }
                </div>
            </div>
            {description && (
                <div className='game-description'>
                    <h2>Description</h2>
                    <p>{description}</p>
                </div>
            )}
        </div>
    )
}