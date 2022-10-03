import { domains } from '../data/data'
import './card.css'
import { Pill } from './pill'


export const Card = ({title, image, domains: gameDomains}) => {
    const richedDomains = gameDomains.map(gd => domains.find(d => gd === d.id))
    return (
        <div className="card">
            <img src={process.env.PUBLIC_URL + image} alt={title}/>
            <div className="container">
                <h2><b>{title}</b></h2>
                <div className='pills'>
                    {richedDomains.map(rd => {
                        return <Pill key={rd.id} label={rd.label} />
                    })
                    }
                </div>
            </div>
        </div>
    )
}