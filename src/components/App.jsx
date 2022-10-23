import { Component } from 'react';
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
    try {
      const images = await getImagesViaApi({
        search: this.state.search,
        page: this.state.page,
      });

      if (
        prevState.search !== this.state.search ||
        prevState.page !== this.state.page
      ) {
        this.setState({ images: [...prevState.images, ...images.hits] });
      }
    } catch (error) {
      console.log('error');
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleFormSubmit = search => {
    this.setState({ search, images: [], page: 1, isLoading: true });
  };

  onLoader = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
  };

  render() {
    return (
      <div className="app">
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={this.state.images} />

        <ToastContainer autoClose={3000} />
        <Loader onClick={this.onLoader} />
      </div>
    );
  }
}
