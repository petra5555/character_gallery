import './Loader.css';
import './Grid.css'

export default function Loader() {
    return (
        <div className="container" style={{ paddingTop: '7px' }}>
            <ul className='grid'>
                {Array.from({ length: 8 }, (_, i) =>
                    <li key={i} className='loader-card'>
                        <div className='loader-img loader-animation'></div>
                        <div className='title loader-animation'></div>
                        <div className='text loader-animation'></div>
                        <div className='text loader-animation'></div>
                    </li>
                )}
            </ul>
        </div>
    )
}