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
    totalHits: null,
    showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, search } = this.state;
    try {
      if (
        prevState.search !== this.state.search ||
        prevState.images !== this.state.images
      ) {
        const response = await getImagesViaApi({ search, page });
        const images = response.data.hits;
        if (!images.length) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          this.setState(() => ({ isloading: false }));
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
            isLoading: false,
            totalHits: response.data.totalHits,
          }));
        }
      }
    } catch (error) {
      console.log('error');
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleFormSubmit = data => {
    this.setState({
      search: data,
      images: [],
      page: 1,
      isLoading: true,
      totalHits: null,
    });
  };

  onLoader = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <div className="app">
        <SearchBar onSubmit={this.handleFormSubmit} />

        {this.state.isLoading && this.state.images.length > 0 && (
          <Loader onClick={this.onLoader} />
        )}

        {this.state.images !== [] && (
          <ImageGallery images={this.state.images} />
        )}

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
      </div>
    );
  }
}
