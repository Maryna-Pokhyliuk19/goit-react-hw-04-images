import Notiflix from 'notiflix';
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
    showLoadMore: true,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (!this.state.isLoading) {
      return;
    }
    const { page, search } = this.state;
    try {
      const images = await getImagesViaApi({ search, page });
      console.log(images);
      if (this.state.images.length === 0 && images.totalHits === 0) {
        Notiflix.Notify.info(`Sorry, there is no ${search}`);
        return;
      }
      if (images.totalHits <= page * 12) {
        this.setState({ showLoadMore: false });
      }
      if (
        prevState.search !== this.state.search ||
        prevState.page !== this.state.page
      ) {
        this.setState({
          images: [...this.state.images, ...images.hits],
          isLoading: false,
        });
      }
    } catch (error) {
      Notiflix.Notify.info('Sorry, something went wrong');
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleFormSubmit = search => {
    this.setState({
      search,
      images: [],
      page: 1,
      isLoading: true,
      showLoadMore: true,
    });
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
        {this.state.images.length > 0 && this.state.showLoadMore && (
          <Loader onClick={this.onLoader} disabled={this.state.isLoading} />
        )}
      </div>
    );
  }
}
