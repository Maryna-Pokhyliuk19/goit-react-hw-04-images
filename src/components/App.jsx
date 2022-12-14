import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { SearchBar } from './Searchbar/SearchBar';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImagesViaApi } from 'services/api';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (!isLoading) {
      return;
    }
    (async function fetchImages() {
      try {
        const images = await getImagesViaApi({ search, page, signal });

        if (images.hits.length === 0 && images.totalHits === 0) {
          Notiflix.Notify.info(`Sorry, there is no ${search}`);
          return;
        }
        if (images.totalHits <= page * 12) {
          setShowLoadMore(false);
        }
        setImages(state => [...state, ...images.hits]);
      } catch (error) {
        Notiflix.Notify.info('Sorry, something went wrong');
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [search, page, isLoading]);

  const handleFormSubmit = search => {
    setPage(1);
    setSearch(search);
    setImages([]);
    setIsLoading(true);
    setShowLoadMore(true);
  };

  const onLoader = () => {
    setPage(page => page + 1);
    setIsLoading(true);
  };

  return (
    <div className="app">
      <SearchBar onSubmit={handleFormSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      <ToastContainer autoClose={3000} />
      {isLoading && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
          wrapperClassName=""
          visible={true}
        />
      )}
      {images.length > 0 && showLoadMore && !isLoading && (
        <Loader onClick={onLoader} />
      )}
    </div>
  );
};
