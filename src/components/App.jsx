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
    if (!isLoading) {
      return;
    }
    async function componentDidUpdate() {
      try {
        const images = await getImagesViaApi({ search, page, controller });

        if (images.length === 0 && images.totalHits === 0) {
          Notiflix.Notify.info(`Sorry, there is no ${search}`);
          return;
        }
        setImages(state => [...state, ...images.hits]);
      } catch (error) {
        Notiflix.Notify.info('Sorry, something went wrong');
      } finally {
        setIsLoading(false);
      }
    }
    componentDidUpdate();

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
  };

  return (
    <div className="app">
      <SearchBar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} />

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
      {images.length > 0 && showLoadMore && (
        <Loader onClick={onLoader} disabled={isLoading} />
      )}
    </div>
  );
};
