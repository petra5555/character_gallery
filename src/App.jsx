import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import Grid from './components/gallery/Grid';
import Search from './components/header/Search';
import { searchCharacters, fetchNextPage } from './util/http';
import rickandmorty from './assets/rickandmorty.png';
import title from './assets/title.png';
import Loader from './components/gallery/Loader';


function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState('');
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [error, setError] = useState(null);

  const isFetchingRef = useRef(false);

  useEffect(() => {
    setError(null);
    setIsLoadingNext(true);

    async function fetchData() {
      try {
        const response = await searchCharacters(query.toLowerCase());
        setData(response.results);
        setPage(response.info.next);
      } catch (error) {
        setError({ message: error.message || 'Could not fetch characters, please try again later.' });
      } finally {
        setIsLoadingNext(false);
      }
    }

    fetchData();
  }, [query]);

  const fetchNext = useCallback(async () => {
    if (isFetchingRef.current || !page) return;
    isFetchingRef.current = true;

    setIsLoadingNext(true);

    try {
      const response = await fetchNextPage(page);
      setData(prevState => [...prevState, ...response.results]);
      setPage(response.info.next);
    } catch (error) {
      setError({ message: error.message || 'Could not fetch characters, please try again later.' });
    } finally {
      if (page) {
        isFetchingRef.current = false;
        setIsLoadingNext(false);
      }
    }

  }, [page]);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= docHeight - 100 && !isLoadingNext) {
        fetchNext();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoadingNext, fetchNext]);

  return (
    <>
      <header className='app-header'>
        <img src={title} alt='Rick and Morty title' height={90} />
        <div>
          <Search query={query} onChange={setQuery} />
        </div>
      </header>
      {!error && data.length && <Grid data={data} />}
      {isLoadingNext && <Loader />}
      {error &&
        <div className='error'>
          <img src={rickandmorty} alt='Rick and Morty error' />
          <h3>{error.message}</h3>
        </div>
      }
    </>
  );
}

export default App;
