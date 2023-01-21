import React, { useState } from 'react';
import { Cards } from './cards';
import { games, parentDomains, subdomainsByDomain } from '../data/data';
import { Choices } from './choices';
import { intersection } from '../utils';
import { useSearchParams } from 'react-router-dom';
import './home.css'
import { Search } from './search';
import { WithDescription } from './with-description';

const normalize = (string) => {
    return string.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "");
}

const stringContains = (input, normalizedSearch) => {
    return normalize(input).includes(normalizedSearch)
}

export const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('text') || '')
    const [descriptionSelected, setDescriptionSelected] = useState(searchParams.get('with-description') === 'true' || false)
    const [selectedDomain, setSelectedDomain] = useState(searchParams.get('domain'))
    const [selectedSubdomain, setSelectedSubdomain] = useState(searchParams.get('subdomain'))
    const subdomains = selectedDomain ? subdomainsByDomain[selectedDomain] || undefined : undefined
    let filteredGames = games;
    if (selectedDomain && subdomains) {
        const ids = selectedSubdomain ? [selectedSubdomain] : [selectedDomain, ...subdomains.map(e => e.id)]
        filteredGames = games.filter(game => intersection(game.domains, ids).length > 0)
    } else if (selectedDomain) {
        filteredGames = games.filter(game => intersection(game.domains, [selectedDomain]).length > 0)
    }
    if (query && query.trim && query.trim() !== '') {
        const normalizedSearch = normalize(query)
        filteredGames = filteredGames.filter(game => {
            let isFound = stringContains(game.title, normalizedSearch) || String(game.id) === query
            if (descriptionSelected) {
                return isFound || stringContains(game.description, normalizedSearch)
            }
            return isFound;
        })
    }
    filteredGames = filteredGames.sort((a, b) => a.title.localeCompare(b.title))
    return (
        <>
            <div className='filters'>
                <div className='search-container'>
                    <Search search={query} withDescription={descriptionSelected} onChange={(value) => {
                        setQuery(value);
                        searchParams.set('text', value)
                        setSearchParams(searchParams)
                    }} />
                    <WithDescription descriptionSelected={descriptionSelected} onDescriptionSelected={(value) => {
                        setDescriptionSelected(value);
                        searchParams.set('with-description', value)
                        setSearchParams(searchParams)
                    }}  />
                </div>
                <div className='choices-container'>
                    <Choices choices={parentDomains} selected={selectedDomain} onSelect={(choiceId) => {
                        setSelectedDomain(choiceId);
                        setSelectedSubdomain(undefined)
                        searchParams.delete('subdomain')
                        searchParams.set('domain', choiceId)
                        setSearchParams(searchParams)
                    }} />
                    {subdomains && <Choices choices={subdomains} selected={selectedSubdomain} onSelect={(choiceId) => {
                        setSelectedSubdomain(choiceId)
                        searchParams.set('subdomain', choiceId)
                        setSearchParams(searchParams)
                    }} />}
                </div>
            </div>
            <Cards games={filteredGames} />
        </>
    )
}