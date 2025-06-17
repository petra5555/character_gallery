import Card from "./Card";
import './Grid.css';
import Loader from "./Loader";

export default function Grid({ data, isLoading }) {
    return (
        <main className="container">
            <ul className="grid">
                {!isLoading ?
                    data?.map((item, idx) => <Card key={idx} character={item} />) :
                    <Loader />
                }
            </ul>
        </main>
    )
}