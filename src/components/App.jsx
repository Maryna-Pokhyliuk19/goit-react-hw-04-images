import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { SearchBar } from './Searchbar/SearchBar';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImagesViaApi } from 'services/api';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (!this.state.isLoading) {
      return;
    }
    const { page, search } = this.state;
    try {
      const images = await getImagesViaApi({ search, page });

      if (images.data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...images.hits],
          isLoading: false,
        };
      });
    } catch (error) {
      console.log('error');
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleFormSubmit = search => {
    this.setState({ search, images: [], page: 1, isLoading: false });
  };

  onLoader = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: false,
    }));
  };

  render() {
    return (
      <div className="app">
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={this.state.images} />

        <ToastContainer autoClose={3000} />

        {this.state.isLoading && (
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
        {this.state.images.length > 0 && <Loader onClick={this.onLoader} />}
      </div>
    );
  }
}
