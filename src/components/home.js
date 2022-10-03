import React from 'react';
import { Cards } from './cards';
import { games } from '../data/data';


export const Home = () => {
    return (
        <Cards games={games} />
    )
}