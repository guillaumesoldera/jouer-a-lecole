import React, { useState } from 'react';
import { Cards } from './cards';
import { games, parentDomains, subdomainsByDomain } from '../data/data';
import { Choices } from './choices';
import { intersection } from '../utils';
import { useSearchParams } from 'react-router-dom';
import './home.css'

export const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedDomain, setSelectedDomain] = useState(searchParams.get('domain'))
    const [selectedSubdomain, setSelectedSubdomain] = useState(searchParams.get('subdomain'))
    const subdomains = selectedDomain ? subdomainsByDomain[selectedDomain] || undefined : undefined
    let filteredGames = games;
    if (selectedDomain && subdomains) {
        const ids = selectedSubdomain ? [selectedSubdomain] : [selectedDomain, ...subdomains.map(e => e.id)]
        filteredGames = games.filter(game => intersection(game.domains, ids).length > 0)
    }
    filteredGames = filteredGames.sort((a, b) => a.title.localeCompare(b.title))
    return (
        <>
            <div className='filters'>
                <div className='choices-container'>
                    <Choices choices={parentDomains} selected={selectedDomain} onSelect={(choiceId) => {
                        setSelectedDomain(choiceId);
                        setSelectedSubdomain(undefined)
                        setSearchParams({'domain': choiceId})
                    }} />
                    {subdomains && <Choices choices={subdomains} selected={selectedSubdomain} onSelect={(choiceId) => {
                        setSelectedSubdomain(choiceId)
                        setSearchParams({'domain': selectedDomain, 'subdomain': choiceId})
                    }} />}
                </div>
            </div>
            <Cards games={filteredGames} />
        </>
    )
}