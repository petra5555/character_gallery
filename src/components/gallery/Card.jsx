import './Card.css';

export default function Card({ character }) {
    return (
        <li className='card'>
            <div className='image-container'>
                <img src={character.image} alt={character.name + ' image'} />
            </div>
            <h2>{character.name}</h2>
            <p>Status: <span className={character.status.toLowerCase() + ' status'}>{character.status}</span></p>
            <p>Species: <b>{character.species}</b></p>
        </li>
    )
};