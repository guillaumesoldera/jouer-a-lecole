import React from 'react';
import { Outlet } from 'react-router-dom';
//import logo from './logo.svg';
import logo from './logo.png';
import './skeleton.css'

export const Skeleton = (props) => {
    return (
        <>
        <header>
            <a href={process.env.PUBLIC_URL} title="Accueil">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Jouons ensemble !</h1>
            </a>
        </header>
        <main>
            <div className='content'>
                <Outlet />
            </div>
        </main>
      </>
    )
}