import { domains } from '../data/data'
import './card.css'
import { ImageWithFallback } from './image'
import { Pill } from './pill'


export const Card = ({title, thumbnail, domains: gameDomains, id}) => {
    const richedDomains = gameDomains.map(gd => domains.find(d => gd === d.id))
    //console.log({gameDomains}, {richedDomains})
    return (
        <div className="card">
            <label className='identifier'>#{id}</label>
            <ImageWithFallback className='game-image' src={process.env.PUBLIC_URL + thumbnail} alt={title}/>
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